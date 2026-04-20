# AI Integration in Healthcare: Use Cases for MedFile

**Author:** Kaike Nehme Marinho | **Date:** 15 April 2026
**Context:** Research contribution for MedFile — DECO3800/7380, Semester 1 2026

This review maps AI use cases onto MedFile's architecture. I've split it into three parts: opportunities where MedFile's unified FHIR substrate adds value, documented failures that define our guardrails, and the design principles I argue should gate any AI feature we integrate. Every citation is framed by its relevance to MedFile — not by what the study did in isolation.

---

## Part 1 — Where MedFile Unlocks AI Value

MedFile's distinctive input to the AI stack is a **single longitudinal FHIR record per patient**. Most clinical AI underperforms in deployment because it sees only a slice of the patient. MedFile closes that slice.

### 1. Cross-institution decision support
- Shang et al., 2024 — the federated CKD case shows what happens when you break the single-site data wall: 434 extra days of lead time, 86% of previously-overlooked cases confirmed. **Relevance:** this *is* MedFile's value proposition, already quantified.
- AI Consult trial, 2025 — 16% fewer diagnostic errors, 13% fewer treatment errors across 39,849 primary care visits. **Relevance:** sets the baseline effect size we can claim for GP-facing CDS on top of MedFile.
- Epic Art Insights — 16M monthly uses of AI-generated patient summaries. **Relevance:** confirms clinician appetite exists; we don't need to justify demand, we need to justify architecture.
- SMART on FHIR / CDS Hooks RCT, 2022 — +130% app utilisation with CDS Hooks integration. **Relevance:** validates our integration standard before we commit to it.

### 2. Longitudinal pattern detection
- Swinckels et al., 2024 (AUROC 0.73–0.97 across 20 studies). **Relevance:** quantifies the accuracy ceiling we could approach *if* our data is long enough per patient.
- Tomasev et al., 2019 (Nature) — AKI predicted 48h early in 90% of dialysis-progressing cases. **Relevance:** the canonical example of "longitudinal data → actionable lead time"; MedFile is the missing substrate in non-NHS settings.
- Vasey et al., 2019 — NHS Streams cut missed AKI from 12.4% → 3.3%. **Relevance:** deployment evidence, not just model evidence.

### 3. Imaging
- DR screening meta-analysis, 2025 — pooled sensitivity 0.94, specificity 0.90 over 255,330 scans. **Relevance:** justifies treating imaging AI as mature enough to reference as DiagnosticReport FHIR resources rather than rebuild.
- FDA: 500+ AI imaging devices cleared by 2024. **Relevance:** implies we *integrate*, we don't build imaging AI in-house.
- IDx-DR, AEYE-DS. **Relevance:** concrete examples of autonomous AI diagnostics that already ship to primary care — the downstream consumers of a unified record.

### 4. Cross-prescriber DDI detection
- Graafsma et al., 2024 — 96% alert override rate in current CDSS. **Relevance:** the problem isn't detection, it's specificity; fragmented prescribing is why.
- AI alert optimisation: 14–90% reduction in alert burden while preserving safety. **Relevance:** MedFile's complete med list is the denominator that makes specificity achievable.
- LLM DDI sensitivity ~99% / specificity 0.64–0.68. **Relevance:** caution — LLMs are screening tools here, not arbiters.

### 5. Triage and risk stratification
- NEJM AI, 2025 — 33% faster time-to-care, correct high-acuity ID 78.8% → 83.1% across 174,648 visits. **Relevance:** effect size for ED-integrated MedFile-backed triage.
- TREWS (Kennedy & Rudd, 2022) — 1.85h faster antibiotics, 3.3% absolute mortality reduction when acted upon. **Relevance:** sepsis is the showcase domain where historical context matters most — exactly what MedFile provides.
- COMPOSER, UCSD, 2024 — sepsis mortality 13.1% → 11.2%. **Relevance:** second independent replication; reduces the risk of citing a one-off.

### 6. NLP on unstructured notes (≈80% of clinical info)
- GatorTron (Yang et al., 2022) — F1 0.90 concept extraction, 0.96 relation extraction. **Relevance:** the SOTA ceiling for turning ingested free-text into structured FHIR resources.
- Van Veen et al., 2023 — GPT-4 summaries preferred/non-inferior in 81% of Stanford cases. **Relevance:** supports a patient-facing "plain-language summary" feature.
- LLMonFHIR, 2025 — physician-validated LLM mobile app over FHIR. **Relevance:** direct architectural precedent.
- npj Digital Medicine, 2025 — 1.47% hallucination, 3.45% omission rate; ~40% of summaries had omission concerns. **Relevance:** sets the disclosure and review bar for any patient-facing NLP we ship.

### 7. Preventive analytics
- *European Heart Journal — Digital Health*, 2025 — cardiovascular risk AUC ≥0.80 across 310k+ admissions. **Relevance:** the "proactive GP alerts" feature has peer-reviewed accuracy evidence.
- *Lancet Primary Care*, 2025 — 2–3× efficiency of protocol-based screening. **Relevance:** efficiency argument for GPs, who are our gatekeeper persona.
- Health network case: 200 yearly readmissions avoided, $5M/yr saved. **Relevance:** we'll need a cost-benefit slide; this is the reference.

### 8. FHIR interop as enabler
- FHIR-Former (Engelke et al., 2025) — 88.1% mortality prediction, 94% ICD-10 classification, outputs as FHIR RiskAssessment. **Relevance:** shows AI outputs *returning* into the FHIR graph — the closed loop MedFile needs.
- Balch et al., 2023 — ML + FHIR scoping review. **Relevance:** citation anchor for justifying FHIR as the interop choice in the report.
- Context: 96% EHR adoption but only 41% seamless exchange; Cures Act + EHDS mandate FHIR APIs. **Relevance:** policy tailwind — we don't need to argue FHIR into existence, only argue our implementation of it.

---

## Part 2 — Failures That Define MedFile's Guardrails

These aren't cautionary tales — they're our design constraints. Each one converts directly into a product requirement.

### 1. Algorithmic bias
- Obermeyer et al., 2019 (*Science*) — Optum algorithm halved Black patients' access to high-risk programs; ~200M people affected. **Relevance:** forces a *data provenance audit* requirement before integrating any third-party model.
- Systematic review, 2024 (PMID 39488857) — AI systematically exacerbates racial disparities. **Relevance:** confirms Obermeyer isn't an outlier.
- Rural/low-SES underrepresentation → 15–20% lower diagnostic accuracy. **Relevance:** Australian context — First Nations and remote populations are the ones MedFile must prove it serves before launch.

### 2. Automation bias
- Lawton et al., 2024 — 92 missed AI errors in 2,298 ECG reviews; 6% of clinicians switched *from* correct diagnosis to incorrect AI recommendation. **Relevance:** argument for showing AI confidence and source data alongside every output.
- 2025 RCT — prior AI training insufficient to offset automation bias. **Relevance:** training isn't a mitigation; UI design is.
- Dermatology dataset with 10 Fitzpatrick V / 1 Fitzpatrick VI images (*Lancet Digital Health*, 2022). **Relevance:** concrete example when we need to pitch "training-data transparency" as a hard requirement.

### 3. Privacy and re-identification
- DeepMind / NHS Streams (2015), 1.6M patients, ICO ruled breach. **Relevance:** failure mode = inadequate consent. Maps directly to a granular-consent design requirement.
- MediSecure, Apr 2024 — 6.5TB on 12.9M Australians; company went into administration. **Relevance:** this is local, recent, and survived administration. It's the single strongest Australian privacy reference we have.
- I-MED / Annalise.ai (2020–2022), OAIC inquiry. **Relevance:** live Australian case law for de-identified data used in AI training without notification.
- Springer *AI and Ethics*, 2025 — "100% anonymity is a theoretical impossibility." **Relevance:** anchors why we treat de-identification as harm reduction, not elimination.

### 4. Black-box opacity
- *BMC Medical Ethics*, 2025 — UK clinicians can't justify opaque outputs; liability anxiety. **Relevance:** explainability isn't a feature, it's a liability reduction.
- 34% of radiologists override *correct* opaque recs. **Relevance:** opacity produces both under- and over-trust — the case for explainability cuts both ways.
- Regulatory silence on explainable vs not. **Relevance:** we can't outsource this to the TGA.

### 5. Real deployment failures
- Epic Sepsis — Wong et al., 2021 — AUROC 0.63 vs 0.76–0.83 claimed; missed 67% of sepsis; 88% false positive. **Relevance:** the canonical "vendor-claimed vs external-validated" gap. Builds the case for requiring external validation as contractual.
- *JAMIA Open*, 2024 — county ED validation worse still (sensitivity 14.7%). **Relevance:** second-site confirmation.
- IBM Watson Oncology — trained on synthetic cases, $4B loss, exited 2022. **Relevance:** prevents anyone on the team proposing training on synthetic data as a shortcut.

### 6. Regulatory gaps
- Abulibdeh et al., 2025 (*PLOS Digital Health*) — 96% of AI devices cleared via FDA 510(k) without clinical-benefit proof; only 5% prospectively tested; transparency score 3.3/17. **Relevance:** TGA clearance ≠ safety. Policy argument for MedFile's own performance gating.
- 91% of models drift post-deployment. **Relevance:** justifies a mandatory monitoring plan as a design element, not an ops afterthought.
- Lawton 2024 — "liability sinks." **Relevance:** if we deploy AI to clinicians, we need vendor contract clauses that don't dump legal exposure on GPs.
- AU$5.8M ACL penalty, Oct 2025 — first Privacy Act civil penalty for health breach. **Relevance:** the Australian regulatory posture is sharpening; our compliance story must match it.

### 7. Patient trust
- Kauttonen et al., 2025 — 19.55% of US adults expect AI to improve the doctor relationship. **Relevance:** trust is the ceiling on adoption; design has to earn it.
- MIT / NEJM AI, 2024 — patients overtrust *specific* AI medical advice despite scepticism of AI in general. **Relevance:** means we cannot rely on users to self-moderate — MedFile has to moderate for them.

### 8. Patient-facing LLM risks
- 1.47% hallucination / 3.45% omission baseline; open-ended tasks up to 60%. **Relevance:** hard upper bound on what we let LLMs do patient-facing.
- *Communications Medicine*, 2025 — LLMs elaborated on planted false values in 83% of cases. **Relevance:** rules out LLM-as-clinical-interpreter entirely.
- 78% would self-diagnose with ChatGPT; APA warning against AI therapy. **Relevance:** the counterfactual — if MedFile doesn't constrain AI, users will use unconstrained AI anyway.
- KFF poll, 2024 — users acted on AI misinformation. **Relevance:** harm is downstream of the model, not inside it.

---

## Part 3 — Design Principles

Seven non-negotiables I argue should gate every AI feature proposal in MedFile:

1. **Constrain scope.** Structure, translate, retrieve — not diagnose, interpret, score.
2. **Transparency by default.** Source data, model, limitations disclosed at point of use.
3. **Granular, explicit consent.** Separate from TOS. Per-feature.
4. **Bias testing as a precondition.** Gender, ethnicity, age, SES — Australian demographic validation including First Nations.
5. **Post-deployment monitoring.** 91% drift rate means no "ship-and-forget."
6. **Liability architecture upfront.** Vendor contracts and regulatory counsel before launch, not after incident.
7. **Trust as a design input.** Data security, physician endorsement, training-data transparency — features, not marketing.

---

## References

### Part 1 — Opportunities
1. Shang Y, et al. (2024). *JMIR*. https://doi.org/10.2196/54263
2. Swinckels L, et al. (2024). *JMIR*. https://doi.org/10.2196/48320
3. Yang X, et al. (2022). *npj Digital Medicine*. https://doi.org/10.1038/s41746-022-00742-2
4. Van Veen D, et al. (2023). https://doi.org/10.21203/rs.3.rs-3483777/v1
5. Kennedy JN & Rudd KE. (2022). *Cell Reports Medicine*, DOI: 10.1016/j.xcrm.2022.100746.
6. Engelke M, et al. (2025). *JAMIA*. https://doi.org/10.1093/jamia/ocaf165
7. Balch JA, et al. (2023). *JMIR Medical Informatics*. https://doi.org/10.2196/48297
8. Graafsma J, et al. (2024). *JAMIA*. https://doi.org/10.1093/jamia/ocae076
9. Tomasev N, et al. (2019). *Nature*. https://doi.org/10.1038/s41586-019-1390-1
10. Vasey B, et al. (2019). *npj Digital Medicine*. https://doi.org/10.1038/s41746-019-0139-4
11. Duggal M, et al. (2025). *JMIR Medical Informatics*. https://doi.org/10.2196/67529
12. *NEJM AI* (2025). https://doi.org/10.1056/AIoa2400296
13. *The Lancet Primary Care* (2025). https://doi.org/10.1016/S3050-5143(25)00079-2
14. LLMonFHIR. *JACC: Advances* (2025). https://doi.org/10.1016/j.jacadv.2025.101780
15. CDS Hooks RCT. *PMC* (2022). https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9346559/
16. *npj Digital Medicine* (2025). https://doi.org/10.1038/s41746-025-01670-7

### Part 2 — Failures
17. Obermeyer Z, et al. (2019). *Science*. https://doi.org/10.1126/science.aax2342
18. Wong A, et al. (2021). *JAMA Internal Medicine*. https://doi.org/10.1001/jamainternmed.2021.2626
19. Lawton T, et al. (2024). *Future Healthcare Journal*. https://doi.org/10.1016/j.fhj.2024.100007
20. Abulibdeh R, et al. (2025). *PLOS Digital Health*. https://doi.org/10.1371/journal.pdig.0000866
21. Abràmoff MD, et al. (2023). *npj Digital Medicine*. https://doi.org/10.1038/s41746-023-00913-9
22. Cross JL, et al. (2024). *PLOS Digital Health*. https://doi.org/10.1371/journal.pdig.0000651
23. Kauttonen J, et al. (2025). *JMIR*. https://doi.org/10.2196/65567
24. *BMC Medical Informatics and Decision Making* (2025). https://doi.org/10.1186/s12911-025-02891-2
25. Dermatology AI disparities. *Science Advances*. https://doi.org/10.1126/sciadv.abq6147
26. IBM Watson for Oncology. AI Incident Database #225. https://incidentdatabase.ai/cite/225/
27. *JAMIA Open* (2024). https://doi.org/10.1093/jamiaopen/ooae133
28. *JMIR* (2024). https://doi.org/10.2196/50344
29. Racial bias scoping review. PMID 39488857. https://pubmed.ncbi.nlm.nih.gov/39488857/

### Australian regulatory/news anchors
- MediSecure — OAIC statement: https://www.oaic.gov.au/newsroom/statement-on-medisecure-cyber-security-incident
- OAIC on I-MED / Annalise.ai: https://www.oaic.gov.au/news/media-centre/oaic-announces-no-further-action-on-i-med-radiology-network-matter
- KFF Health Misinformation Poll (2024): https://www.kff.org/health-misinformation-and-trust/

---

## Reflection — What This Means for MedFile

Writing this review shifted my position on AI in MedFile. I came in asking *which AI features should we build*. I'm leaving with a different question: *where does MedFile needs to have an embedded AI system and risk to be AI dependant*.

The asymmetry in the evidence is stark. The opportunities in Part 1 are mostly about *enabling other people's AI*, CDS Hooks, SMART on FHIR, FHIR-Former, LLMonFHIR. Almost none of them argue MedFile should train or host models itself. The failures in Part 2, by contrast, are overwhelmingly about *owning* AI badly, Epic shipping an under-validated sepsis model, IBM training on synthetic data, I-MED sharing patient scans without consent. The pattern is consistent: teams that built AI into their core product have a higher failure rate than teams that built *a substrate other AI can plug into*.

For our team, this reframes the design decision. MedFile's value isn't that it has AI — it's that it *unfragments the record*, which is what makes every Part 1 use case achievable in the first place. The MedFile-specific contribution is the data layer, not the model layer. If we over-index on AI features in the prototype, we risk two things: inheriting the failure modes of Part 2 (bias, opacity, liability), and distracting from the interoperability argument that is genuinely ours to make.

There are three concrete positions I'll bring into the Week 9 critique:

1. **MedFile should expose, not embed.** Ship SMART on FHIR and CDS Hooks endpoints so third-party clinical AI can query the record. Don't bundle a model into the first release.
2. **Patient-facing AI is scope-limited by default.** Structure, translate, retrieve — never interpret, diagnose, or score. The hallucination and omission evidence is clear enough that this should be a non-negotiable in the final proposal.
3. **Consent is a product feature, not a policy footnote.** I-MED, DeepMind/NHS, and MediSecure all failed on consent architecture. Our prototype should treat granular per-feature consent as a first-class UI surface, not a settings-menu afterthought.

The honest tension: a "MedFile without AI" prototype will feel less exciting to pitch than one with AI summaries and risk flags baked in. But the evidence points the other way. The defensible design is the restrained one and "restrained by choice, for documented reasons" is a stronger story in an Interim Critique than "feature-loaded because it sounded good."

That's the argument I want to test with the team this week.
