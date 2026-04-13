# Cybersecurity & Patient Data Breaches in Australian Healthcare

> **Sources:** Metro North Health | ADHA Cyber Security Report 2022 | IT Start | iTnews

---

## 1. The Threat Landscape

The global and Australian healthcare cybersecurity environment has deteriorated significantly over recent years. The ADHA report identifies **social engineering, ransomware, and system intrusion** as the dominant attack patterns across all global regions. In the Asia-Pacific specifically, social engineering and basic web application attacks are the leading threat vectors.

Healthcare received an average of **1,387 cyberattacks per week globally in 2022** — a 69% increase from 2021 — making it one of the most targeted sectors worldwide, ranking fifth across all industries by volume but first in terms of year-on-year growth rate.

Australia faces a compounded threat environment due to geopolitical tensions, financially motivated cybercriminals, and an over-reliance on legacy digital infrastructure in the health sector.

---

## 2. Key Threat Types Targeting Patient Data

### 2.1 Ransomware

Ransomware attacks on healthcare nearly doubled between 2020 and 2021, with **66% of healthcare organisations globally** reporting being hit — up from 34% the prior year. Key statistics:

- Healthcare organisations are the **most likely sector to pay the ransom** — 61% did so, compared to a global average of 46%
- Average cost to recover from a ransomware incident in healthcare: **US$1.85M**, above the global average of US$1.40M
- **70%** of surveyed organisations reported ransomware attacks led to longer patient hospital stays and delays in procedures, directly contributing to **increased patient mortality**
- **65%** reported an increase in patients being diverted to other facilities
- **36%** reported an increase in complications from medical procedures

### 2.2 Phishing & Email Compromise

Phishing remains the **single most common entry point** for attackers across the healthcare sector. It exploits human error rather than technical vulnerabilities — staff receive convincing emails requesting password resets or urgent system actions, and a single click can compromise an entire clinical network.

- In the NHS, over **1,000 phishing messages** were sent from compromised email accounts belonging to 139 NHS employees across Scotland and England
- Business Email Compromise (BEC) was among the most prolific cybercrime types targeting Australian organisations in 2022

### 2.3 Insider Threats & Human Error

According to the **Verizon Data Breach Investigations Report 2022**, insider threats are the predominant cause of breaches in healthcare. The trend has shifted from deliberate malicious misuse toward **accidental human error**. The OAIC's Notifiable Data Breaches report identifies the top human error causes as:

- Emailing patient information to the wrong person
- Unintended public release of records
- Physical loss of paperwork or data storage devices

### 2.4 Silent Data Exfiltration

A significant category of breaches involves attackers gaining access and **silently copying patient data** without triggering ransomware alerts. These breaches often go undetected for weeks or months, with victims only discovering the damage when their details appear on criminal marketplaces or are used for identity fraud.

### 2.5 Unpatched Software Vulnerabilities

The **Log4j vulnerability (CVE-2021-44228)**, discovered in late 2021, remained actively exploited throughout 2022:

- Within one week of discovery, over **100 exploitation attempts were detected every minute** globally
- Australian organisations including NSW Government were confirmed compromised via Log4j
- The US Cyber Safety Review Board classified it as an **"endemic vulnerability"** — meaning unpatched instances will persist in systems for years
- **Spring4Shell** was a similarly critical vulnerability affecting Java-based healthcare applications

---

## 3. Notable Incidents — Australia

| Incident | Year | Nature | Scale |
|---|---|---|---|
| RBWH Head & Neck Clinic | 2021 | Personal email of clinician hacked; patient contact and appointment data exposed | Undisclosed |
| Medlab Pathology | 2022 | Ransomware attack | ~223,000 individuals |
| Optus | 2022 | Data breach — drivers licence, passport, Medicare numbers leaked | 2.1 million customers |
| Medibank Private | 2022 | Breach linked to Russian threat actors; sensitive health information publicly disclosed | 9.7 million customers |
| Top Health Doctors (Brisbane) | 2023 | Administrative email account compromise; Medicare numbers, DOB, addresses exposed | ~5,500 patients |

> **Note:** The Optus and Medibank Private breaches alone collectively impacted the privacy of up to **18 million Australians**.

---

## 4. Why Healthcare Is a Prime Target

Several structural factors make healthcare organisations disproportionately vulnerable:

- **High data value** — A complete medical record can sell for **10 to 50 times more** on the dark web than a stolen credit card number, as it contains personal identifiers, insurance information, and health history
- **Operational pressure** — Healthcare providers cannot afford prolonged downtime, creating immense pressure to pay ransoms quickly to restore patient care continuity
- **Legacy infrastructure** — The sector is characterised by outdated technologies, skeleton IT teams, and historically low investment in cybersecurity
- **Rapid digitalisation** — Telehealth and cloud platform adoption during COVID-19 prioritised speed over security hardening, leaving significant exploitable gaps
- **Staff training gaps** — Employees often lack formal cybersecurity literacy, making human error a persistent and exploitable vulnerability

---

## 5. Regulatory Framework (Australia)

| Framework | Key Requirement |
|---|---|
| **Privacy Act 1988** | Governs collection, storage, use, and disclosure of patient information |
| **Notifiable Data Breaches (NDB) Scheme** | Mandates notification to affected individuals and the OAIC when a breach is likely to cause serious harm; penalties up to **AUD $2.5 million** |
| **ADHA Cyber Security Strategy 2022–2025** | National framework for uplifting cyber capability across four pillars: capability & proportionality, workforce investment, security culture, governance & operations |
| **OAIC NDB Reporting** | Health services are consistently a top-reporting sector, indicating both high incident frequency and growing compliance awareness |

---

## 6. Recommended Controls & Mitigations

| Control | Purpose |
|---|---|
| Multi-Factor Authentication (MFA) | Prevents unauthorised access even when credentials are compromised |
| Role-Based Access Control (RBAC) | Limits staff access to only records relevant to their clinical role |
| Staff Cybersecurity Awareness Training | Quarterly refreshers and simulated phishing exercises to reduce human error |
| Regular Patching & Vulnerability Management | Prioritises systems handling patient data to close known exploits |
| Tested Backup & Recovery Procedures | Reduces ransomware leverage by enabling restoration without paying ransom |
| Strict Email Use Policies | Prohibits personal email accounts for any work-related patient communication |
| Audit Logging & Access Monitoring | Enables early detection of anomalous access patterns |
| Security-by-Design | Embeds security controls across all new digital health projects from inception |

---

## 7. References

1. Metro North Health — *Potential Privacy Breach at RBWH Head and Neck Clinic* (2021). https://metronorth.health.qld.gov.au/news/potential-privacy-breach-at-rbwh-head-and-neck-clinic
2. Australian Digital Health Agency — *Cyber Security Report 2022*. https://www.digitalhealth.gov.au
3. IT Start — *Internet Risks in Healthcare: What Brisbane SMEs Face* (2026). https://itstart.com.au/blog/internet-risks-healthcare-brisbane
4. iTnews — *Services Australia Vets Customer Data After Brisbane Medical Group Breach* (2023). https://www.itnews.com.au/news/services-australia-vets-customer-data-after-brisbane-medical-group-breach-602987
