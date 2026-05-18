 London Ambulance Service (LAS) Computer-Aided Despatch (CAD) system failure of 1992.

The most notable case study of a 999 (UK equivalent to emergency services) platform failure in England is the London Ambulance Service (LAS) Computer-Aided Despatch (CAD) system failure of 1992. This incident is considered one of the most visible and widely studied information system failures in UK history, highlighting critical issues in software engineering, project management, and socio-technical design. 
UCL | University College London
UCL | University College London
 +2
Case Study: London Ambulance Service (1992) 
Date of Failure: October 26–27, 1992.
The System (LASCAD): The project aimed to automate ambulance dispatch, replacing a paper-based system with a real-time computer system to speed up response times.
The Failure: Upon activation, the system was flooded with 2,900 calls (higher than the usual 2,300). The system could not cope, causing ambulances to take over 3 hours to answer calls, against a government target of 17 minutes. Many screens froze, data was lost, and calls weren't acknowledged.
Impact: Reports suggested 20–30 people may have died due to delays. The failure was caused by a combination of a system memory leak, incorrect ambulance location data, and a lack of user training.
Key Failures in Management:
Unrealistic Design: A totally automated system was attempted too quickly, leaving out crucial human interaction.
Inexperienced Suppliers: The contract was awarded to a low-cost supplier without experience in large-scale projects.
Lack of Consultation: Ambulance crews were not involved in the design process. 
ScienceDirect.com
ScienceDirect.com
 +3
Lessons Learned
The LASCAD failure is a classic case study in software engineering, demonstrating that IT projects fail not just because of code bugs, but due to human and organizational factors. 
UCL | University College London
UCL | University College London
 +1
Socio-technical approach: Systems must be designed around the users (paramedics/operators) rather than forcing users to fit the technology.
Testing and Validation: A system that works in isolation may fail under high-stress, real-world conditions.
Contingency Planning: The lack of a smooth backup system created chaos when the automated system failed. 
UCL | University College London
UCL | University College London
 +4
Note: A new, successful system was eventually implemented in March 2012. 
Royal Academy of Engineering
Royal Academy of Engineering
Other Notable Incidents
NHS England Network Failure (2023): A recent example includes network issues arising from a failed firewall replacement, affecting 999/111 call handling in London.
FiReControl Project (2011): The failure of this project to regionalize fire control rooms resulted in a £20M waste of public funds due to poor management of external consultants. 
NHS England
NHS England
 +1

 http://www0.cs.ucl.ac.uk/staff/A.Finkelstein/papers/lascase.pdf


What is stroke telemedicine?
Professor Chris Bladin from Victorian Stroke Telemedicine explains how technology allows neurologists to remotely diagnose strokes in regional areas for rapid treatment. See more stroke public lectures at strokefoundation.org.au/en/Events/2018/01/Public-Lecture-Series-2018

 https://www.youtube.com/watch?v=nYlrUOSX0pw


Tech/design issue (Mariana) Easter week 
--------------------------

Human Factors Risk Management as a Way to Improve Medical Device Safety: A Case Study of the Therac 25 Radiation Therapy System

Background & Context
A fatal incident in 1984, much discussed in the literature, involved a patient receiving 16,000 rads instead of the intended 180 rads during radiation treatment — an outcome that likely could have been prevented through proper risk analysis. 
Core Problem
The Therac 25 incidents arose from a combination of technical failures (software and possibly hardware) alongside human behavior, resulting in catastrophic radiation overdoses. ScienceDirect

Key Concepts: "Use Errors"
Risk analysis techniques to identify use errors have received increasing attention in healthcare. Use errors are defined as a pattern of predictable human errors attributable to inadequate or improper design. 

Risk Analysis Tools Examined
Among the most widely used risk analysis tools are Failure Modes and Effects Analysis (FMEA) and Fault Tree Analysis (FTA). The paper demonstrates how these tools can be applied to the Therac 25 case when use errors are included as faults. 

Main Conclusion
From a manufacturer's perspective, FMEAs and FTAs are valuable methods to systematically evaluate a medical device design's potential for inducing use errors. When these risk analyses are done early in the development cycle, potential faults and their resulting hazards are identifiable and much easier to mitigate with error-reducing designs.


https://www.sciencedirect.com/science/article/abs/pii/S1549374104300821#:~:text=Risk%20analysis%20techniques%20to%20identify,resulting%20in%20catastrophic%20radiation%20overdoses.

How Bad UX Killed Jenny
The Story
Jenny was a little girl who had previously been in a hospital ward for cancer for four years and was discharged. After relapsing, she had to be given a very strong chemo treatment medicine — so toxic that it required pre-hydration and post-hydration for three days with I.V. fluid. 
What Went Wrong
After the medicine was administered, three nurses attending to the charting software — with over 10 years of experience — were too distracted trying to figure out the software they were using, and completely missed the critical hydration order. 
The Outcome
The day after her treatment, Jenny died of toxicity and dehydration. The experienced nurses made this critical error because they were too distracted trying to figure out the software.
Why the Interface Failed
The software violated simple and basic rules of usability. The density of information was so high that it was impossible to scan for critical information quickly O'Reilly — critical data was effectively buried in visual noise.
The Broader Point
In Jenny's case, human cognitive abilities were largely overestimated. The information overload in the interface didn't allow the nurses to focus on what was important, and critical information was buried within the system. This lack of clarity and straightforwardness ultimately contributed to her death.
The Call to Action
The author argues we cannot stand by while people's lives, health, and rights suffer because of bad design — and makes the case that UX designers are urgently needed in fields like healthcare that have historically been "untouched" by human-centered design thinking.

https://medium.com/tragic-design/how-bad-ux-killed-jenny-ef915419879e

Tragic Design : the impact of bad design and how to fix it.

Introduction: The Core Philosophy
The book's central argument is that poorly designed products can anger, sadden, exclude, and even kill people who use them — and that the designers responsible certainly didn't intend harm. Tragicdesign The guiding principle is borrowed from medicine: Primum non nocere — First, do no harm.
The book's goal is to make sure no designer ever signs off on work without considering the consequences of their decisions. Sawyerh
Key framing: There's a concept from healthcare called the Swiss Cheese model of accident causation — comparing human systems to multiple slices of holed cheese. Each layer has its own flaws, but together they reduce the chances of an error happening. When all the holes line up, tragedy occurs. 

Chapter 1 — Design Can Kill
Poor design isn't simply unpleasant to look at or frustrating to navigate — it can cause irreparable harm. GetAbstract Case studies examined include the Therac-25 radiation machine, a New York City ferry crash, the Ford Pinto, and Flight 148.
Key lessons from these cases: harm doesn't always come from negligence — it often comes from bad processes, absent usability standards, or skipped user testing. All software, even extremely well designed, will behave unexpectedly under certain conditions.

Chapter 2 — Design Can Anger
The chapter distinguishes impolite technology from dark patterns. Polite software should:

-Ask for the user's permission before acting
-Offer alternatives and explain options
-Anticipate user needs, remember user decisions
-Be mindful of tone and words

Dark Patterns — UI deliberately crafted to trick users — include: Bait & Switch, Fake Content, Forced Continuity, Friend Spam, Misdirection, and Roach Motels. The book stresses that dark patterns ultimately backfire, harming company metrics and eroding user trust.

Chapter 3 — Design Can Sadden
When creating a feature meant to celebrate, designers should allow users to opt out. Smileys, thumbs, likes, stars, and hearts carry a great load of emotion. 
The book introduces the concept of a "Sad Sheriff" — someone on the team whose role is to catch features that might inadvertently cause emotional harm. It also warns against "Dribbblelisation" — prioritising visual aesthetics over real human emotional context.

Chapter 4 — Design Can Exclude
Design is a bridge into technology. If a group of people is excluded, they get left behind in many ways: socially, economically, and creatively. 
Practical accessibility guidance covers: not relying on colour alone to convey information, using high-contrast text, providing alt text, avoiding text embedded in images, designing keyboard-navigable forms, and treating internet access as a human right.
The chapter also covers injustice through design — examining how confusing government interfaces around food stamps, parking tickets, and prison visits disproportionately harm vulnerable populations.

Chapter 5 — Tools & Techniques
Knowing that people hate your product is much better than living in blissful ignorance. DEV Community
The chapter advocates going beyond simple Likert-scale surveys to truly understand user emotion — including learning to read microexpressions (involuntary, under half a second) and macroexpressions (half to four seconds) during usability testing. Tools like Plutchik's Wheel of Emotions and customer journey mapping are recommended for tracking emotional data.

Chapter 6 — What We Can Do
The book positions designers as gatekeepers of technology, with responsibility to ensure those gates are as wide open and accessible as possible.
To be a great designer, the book recommends: being a world-class communicator, practising user-centered design methodology, using data as ammunition to persuade stakeholders, maintaining a student's mindset, teaching others, and always asking "who is losing and who is winning?" in any design decision.

https://books.google.com.au/books?hl=en&lr=&id=3vS1DgAAQBAJ&oi=fnd&pg=PR5&dq=tragic+design+&ots=Gkf4t4XBSc&sig=Qmofyu2ED8OwmVsmkXF5Xi64QiE&redir_esc=y#v=onepage&q&f=false

The good, the bad, and the poorly designed: The mobile app stores are not a user-friendly experience for health and medical purposes

The Core Problem
With over 300,000 health-related apps across both the Apple App Store and Google Play Store — and over 10,000 behavioral health apps alone — the ability for users to self-identify apps for utilization is overwhelming. 
The COVID-19 pandemic saw a 40% increase in the use of mental health-related apps, reflecting the social need for health services not readily accessed in person. Yet the infrastructure to find quality apps has not kept pace.

How the App Stores Fail Users
The current Apple App Store and Google Play Store presents a user interface predicated on users perusing apps at their own leisure or having a pre-identified app to download. There is no systemic means of indexing or finding apps on the store, aside from preset categories (e.g., games, entertainment, productivity) or using general search terms. 
The authors' own research vividly illustrates this: a search of the Google Play Store for Travel Medicine terms identified 3,740 apps — but after removing duplicates and examining each one, the vast majority had no medical relevance. A search for "Malaria Plasmodium Vivax" generated apps with no medical implication whatsoever. 

The Scale of the Problem for Researchers
Across multiple studies and specialties, it was common for investigators to review hundreds of apps only to select a small sample for actual assessment. The time invested — searching, collecting information, navigating developers' websites, documenting app data, and screening — was significant, and this doesn't even include time dedicated to evaluating the individual apps for clinical utilization. 
The Patient Burden
Taking into account issues such as limited app descriptions, app costs, and medical literacy, the patient experience must be equally as problematic. Users of apps tend to stop using them after only several days or weeks, which may represent the trialing period patients spend exploring an app before moving onto another. For patients to self-discover apps to manage their health is a burden that has yet to be addressed and may be an impediment to large-scale adoption.

Proposed Solutions
The paper outlines several frameworks for improvement, including evaluation websites run by health professionals, digital formulary systems, national app libraries (like the NHS App Library), formal medical society guidelines, and nonprofit task forces.
For the app stores themselves, the authors recommend an advanced search function for specific medical categories (e.g., heart disease, diabetes, mental health) or features (e.g., symptom tracker, telehealth), a tagging system for specialties similar to how game stores categorize types, and a mechanism to report potentially inappropriate medical apps to reduce low-quality or dubious health content. 

Conclusion
Mobile app stores are now the primary means for patients to access digital health products and services. However, app stores are inherently poorly designed and limit the effectiveness of patients and clinicians to actively identify and utilize such apps without using outside resources. These limitations will continue to hamper digital health endeavors, especially as a push for evidence-based prescribable apps comes to the fore. This can be rectified by better collaboration amongst multiple stakeholders to improve design and utilization for current and future patient needs 

https://journals.sagepub.com/doi/full/10.1177/20552076221090038

Medical Usability: How to Kill Patients Through Bad Design

The Central Argument
Usability is often a matter of life or death. Medical systems have provided many well-documented killer designs — and usability problems in the medical sector's everyday office automation systems can harm patients just as seriously as machines used for direct treatment. 
The article is built around a JAMA field study of a hospital's physician order-entry system, which identified 22 ways the system caused patients to receive the wrong medication. Nielsen observes that most of these are classic, well-understood usability problems — not exotic engineering failures.

The 6 Key Usability Failures Identified
1. Misleading Default Values
System screens listed dosages based on the medication units available through the pharmacy — not typical prescription doses. Physicians often assumed the listed unit was the typical dose, leading to under- or over-prescribing. Years of usability studies have shown that users tend to assume that given default or example values are applicable to their own situations. 
2. New Commands Not Checked Against Previous Ones
When doctors changed a patient's medication dosage, they often entered the new dose without cancelling the old one, resulting in patients receiving the sum of both doses. This is equivalent to a banking interface allowing you to pay the same bill twice — many bank websites catch exactly this error and ask users to double-check. 
3. Poor Readability
Patient names appeared in a small, difficult-to-read font, making it easy to select the wrong patient. The problem was compounded by names being listed alphabetically rather than grouped by hospital area. In individual patient records, the patient's name didn't appear on all screens, reducing the probability that users would catch errors before reaching a critical point in the interaction. 
4. Memory Overload
Users sometimes had to review up to twenty screens to see all of a patient's medications. In a survey, 72% of staff reported they were often uncertain about medications and dosages because of the difficulty in reviewing a patient's total medications. Humans are notoriously poor at remembering exact information — minimising users' memory load has long been one of computing's top-ten usability heuristics. 
5. Date Description Errors
The interface let users specify medications for "tomorrow." When surgeries ran late and orders were entered after midnight, patients would miss a day's medication. 
6. Overly Complicated Workflow
Many aspects of the system required users to navigate numerous screens that conflicted with actual hospital workflow. As a result, nurses kept a separate set of paper records that they entered into the system at the end of the shift — both increasing error risk and preventing the system from reflecting real-time patient information. Whenever users resort to sticky notes or paper workarounds, the UI has failed. 

On Methodology
Nielsen critiques the study's reliance on self-reported survey data, noting that people have poor memory of their computer interactions, and that hospital staff may unconsciously minimise reported medication errors. Valid data comes from what people do, not what they say — and if anything, the true error rate is probably higher than the self-reported estimates in the survey. 

The Broader Lesson
Vendors often think that having domain experts on staff means their software will work in the field. But the way people are supposed to work in theory never matches reality. The more specialised the system, the more you need user research to ensure success. From physicians to firefighters, if you don't observe real users and test your designs with them, you are guaranteed a plethora of usability problems.

https://www.nngroup.com/articles/medical-usability/

UX in healthcare: the hidden risks of poor design UX

The Core Argument
In healthcare, the stakes are much higher than in most digital products: medical UX design can affect not only how easy a product is to use, but also the health — and sometimes even the lives — of patients. Poor UX in healthcare is incredibly expensive, which is why investing in a user experience that truly works is not a luxury, but a must. vilmate

Why Healthcare UX Lags Behind
Historically, healthcare has been slower to adopt technology compared to other industries. According to a Nuffield study, the healthcare sector trails other industries by at least a decade in terms of process digitalization. That's why many systems still look and function as if they were designed decades ago — with outdated logic and little regard for user needs. 

A Real-World Failure: The VA EHR System
During the rollout of a new electronic health record system by the US Department of Veterans Affairs in 2020, the system failed to process over 11,000 clinical orders. Doctors were never notified: the interface did not indicate that the data had "stalled" and never reached the intended recipients. As a result, at least 149 cases of patient harm were documented, including one classified as severe. 
This case highlighted that the issue was not only technical but also a design failure — users had no way to see, interpret, or respond to critical information promptly. 

The 8 Most Common UX Mistakes in Healthcare
The following mistakes keep repeating and can turn technology from a helper into a danger: complicated navigation and cluttered screens that waste doctors' time; unclear statuses and missing alerts that leave orders silently stuck; too many clicks that multiply error chances across a full day; workflow mismatch where interfaces don't reflect actual practice; one-size-fits-all screens that flood every role with irrelevant information; ignoring accessibility by using small fonts and low contrast; poor integration between scheduling, labs, and billing that forces manual re-entry; and workarounds where nurses jot paper notes under pressure and enter them later, losing information in the process. 
The scale of the administrative toll is striking: a 2023 study in JAMA Network Open showed that US primary care doctors spend over 4.5 hours a day on electronic health records — more than half of which is spent after hours. 
And leadership has taken notice: in a 2024 Juno Health survey, EHR usability was named the top IT pain point — even bigger than AI or telemedicine. 

The Financial Cost
According to Black Book Research, the US healthcare system loses more than $8 billion annually due to inefficient digital systems — up from $1.7 billion in 2017. The cost of poor healthcare UX is skyrocketing. 
The article breaks down exactly how small design flaws compound into massive losses: wasted staff time from extra clicks and overloaded screens, costly workarounds in duplicate records, lengthy and expensive onboarding for complex systems, ongoing support and redesign bills, legal risks when interface confusion leads to medical errors, and patient attrition when frustrating apps drive people to seek care elsewhere.

What Good Healthcare UX Looks Like
Good healthcare UX design is not just about "convenient buttons" or a nice-looking screen — in medicine, it's a matter of trust, safety, and efficiency. Key principles include: user-centered design built around real workflows with early user involvement; clear navigation with minimal steps and quick access to critical information; effective data visualization that lets doctors assess patient condition in seconds; standardization and consistency across modules; accessibility for elders and people with disabilities; transparency through clear statuses, alerts, and error messages; and continuous improvement through regular feedback and real-world testing.

https://vilmate.com/blog/ux-in-healthcare-the-hidden-risks-of-poor-design/

Week 7

Transfer miscommunication leads to the death of Jennifer Nibarger <https://www.youtube.com/watch?v=ssWSoN00yxI> 
Brent Nibarger talks about a mistake in the paperwork in the hospital took aways his wife. He talks about how the tragic event happen and how when he was looking for answers of what went wrong, he discovers a list of wrong on the medical data storage, and how a system organize the information. How for each case can be a thousand pages of report and none of the medical workers saw it. How the lack of organization makes a gap of information between worker and pacient's case. 

The secret to designing better medical devices | Carla Zampaglione | TEDxSwinburne University 
<https://www.youtube.com/watch?v=pFOD8mej3ys> 
"Picture a world where a simple design flaw in a medical device leads to tragedy. This talk explores the critical importance of usability in medical devices, emphasizing how empathy for healthcare professionals and patients can drastically improve safety and outcomes. Carla, a former mechanical engineer with international product development experience, founded Sento Solutions, a consultancy specializing in Usability Engineering (UE) and Human Factors (HF) for medical devices and digital healthcare products."

 How We Can Improve the Healthcare UX | Dave Minifie | TEDxGatewayArchSalon <https://www.youtube.com/watch?v=2w4TBeNkbng> 
"Dave brings a humorous approach to the question of how we can start fixing healthcare. At the most basic level it needs to be about User Experience. " 

Using UI and UX design to fix healthcare 
<https://www.youtube.com/watch?v=sHMNX-yp6K0> 
"Poor software design is often to blame for doctors' burnout. But what does it look like for good software design to help doctors? I'm discussing how UI Design can help doctors and healthcare workers in this video." Based on this last video, it is necessary to think about how the UX design in medical field can not only affect patients. Lifestyle of medical workers is already stressful with long work shift, physical and mental exhausted and how making a user friendly design for a system that they use can simplify their life, optimize time, give a better diagnostic and treatment to patience’s and can improve their work lifestyle. 

UX design in healthcare: Making a real difference in clinical workflows 
<https://www.youtube.com/watch?v=BbyH9t8u7PE> 
"Behind every clinical workflow there are people working under constant pressure. To meet their needs right from the start, it is essential to understand their daily routines. Timo Rohlig, UX designer at Siemens Healthiness, shares how these insights help him design user interfaces — and how thoughtful solutions can make hospital work easier and more focused on patients. "
