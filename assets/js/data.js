/**
 * PORTFOLIO DATA
 * 
 * Edit this file to update the content of your portfolio.
 * Supports both French (fr) and English (en).
 */

window.portfolioData = {
    identity: {
        name: "NICODEME MOULONGA",
        title: {
            fr: "Data Analyst | Data Engineer & IA",
            en: "Data Analyst & AI | Data Engineer & AI"
        },
        subtitle: {
            fr: "Orienté décision et performance",
            en: "Decision & Performance Oriented"
        },
        location: "Paris, France",
        email: "nicodememoulonga@gmail.com",
        phone: "07 53 24 51 86",
        availability: {
            fr: "Disponible immédiatement",
            en: "Available immediately"
        },
        languages: [
            { name: { fr: "Français", en: "French" }, level: { fr: "Maternelle", en: "Native" } },
            { name: { fr: "Anglais", en: "English" }, level: { fr: "Intermédiaire", en: "Intermediate" } }
        ],
        interests: {
            fr: ["Football"],
            en: ["Football"]
        }
    },
    about: {
        fr: "Data Analyst & Engineer orienté décision et performance, expert en pipelines ETL, automatisation Power BI et modélisation prédictive sous Python. Expérience dans la data bancaire et industrielle, fort intérêt Cloud (GCP, AWS, Fabric, Databricks) et IA générative (LLM, RAG, GPT) appliquée au pilotage stratégique.",
        en: "Decision and performance-oriented Data Analyst & Engineer, expert in ETL pipelines, Power BI automation, and predictive modeling using Python. Experience in banking and industrial data, strong interest in Cloud (GCP, AWS, Fabric, Databricks) and Generative AI (LLM, RAG, GPT) applied to strategic steering."
    },

    projects: [
        {
            id: 2,
            title: "Automatisation & Pilotage Budgétaire avec Alteryx",
            shortDescription: {
                fr: "Automatisation du suivi budgétaire mensuel et génération d'alertes financières.",
                en: "Monthly budget tracking automation and financial alerts generation."
            },
            fullDescription: {
                fr: `🎯 **Contexte** : Ce projet vise à automatiser le suivi budgétaire mensuel en centralisant les données financières (budgets, dépenses réelles) et en produisant des indicateurs clés (KPIs) ainsi que des alertes budgétaires. L’objectif est de faciliter le pilotage financier et de fiabiliser les reportings sans intervention manuelle.

🌟 **Expertise** : Maîtrise avancée d'Alteryx Designer pour le Data Blending et l'automatisation de workflows complexes complexes.

🏗️ **Points clés** :
- **Data Preparation** : Import et normalisation des flux budgets et dépenses réelles.
- **Calculs KPIs** : Calcul automatique des variances, taux de consommation et indicateurs de performance.
- **Alerting Intelligent** : Filtrage automatique des dépassements et génération d'un dataset d'alertes dédié.
- **Reporting BI Ready** : Sorties structurées pour intégration immédiate dans des outils de visualisation.

📈 **Valeur Ajoutée** :
- Gain de temps massif sur le traitement mensuel.
- Fiabilité totale des données via la suppression des erreurs manuelles.
- Visibilité proactive sur les dérives budgétaires.`,
                en: `🎯 **Context**: This project aims to automate monthly budget tracking by centralizing financial data (budgets, actual spending) and producing key performance indicators (KPIs) as well as budget alerts. The goal is to facilitate financial management and reliable reporting without manual intervention.

🌟 **Expertise**: Advanced mastery of Alteryx Designer for Data Blending and complex workflow automation.

🏗️ **Key Points**:
- **Data Preparation**: Import and normalization of budget and actual expenditure flows.
- **KPI Calculations**: Automatic calculation of variances, consumption rates, and performance indicators.
- **Intelligent Alerting**: Automatic filtering of overruns and generation of a dedicated alert dataset.
- **BI Ready Reporting**: Structured outputs for immediate integration into visualization tools.

📈 **Added Value**:
- Massive time savings on monthly processing.
- Total data reliability through the elimination of manual errors.
- Proactive visibility on budgetary drifts.`,
            },
            stack: ["Alteryx", "ETL", "Finance", "Data Blending", "Reporting", "Automatisation"],
            tags: ["Alteryx", "ETL", "Finance", "Automatisation"],
            images: [
                "assets/img/Alteryx/Budget.png",
            ],
            //video: "assets/img/Etl_taxis.mp4", // Placeholder video
            links: {
                github: "#",
                demo: "#"
            },
            role: {
                fr: "Data Architect",
                en: "Data Architect"
            },
            impact: {
                fr: "Automatisation complète du reporting financier et détection proactive des anomalies.",
                en: "Full automation of financial reporting and proactive anomaly detection."
            },
            date: "2026"
        },
        {
            id: 5,
            title: "Ingénierie de Pipeline Big Data – NYC Taxi Analytics",
            shortDescription: {
                fr: "Pipeline ELT automatisé sur GCP pour l'analyse massive de flux de transport.",
                en: "Automated ELT pipeline on GCP for massive transport flow analysis."
            },
            fullDescription: {
                fr: `🎯 **Objectif** : Automatiser l'ingestion et le traitement de données massives (Big Data) pour optimiser l'analyse des flux de transport urbain.

🌟 **Expertise** : Mise en œuvre d'un pipeline ELT robuste sur Google Cloud Platform, transformant des millions de trajets bruts en données structurées prêtes pour l'analyse décisionnelle.

🏗️ **Points clés** :
- **Modern Data Stack** : Ingestion via Python, stockage GCS et entrepôt BigQuery.
- **Orchestration** : Automatisation complète des flux avec Apache Airflow.
- **Impact** : Suppression des tâches manuelles (-90% de temps) et garantie d'une donnée propre et fiable.`,
                en: `🎯 **Objective**: Automate the ingestion and processing of massive datasets (Big Data) to optimize urban transport flow analysis.

🌟 **Expertise**: Implementation of a robust ELT pipeline on Google Cloud Platform, transforming millions of raw records into structured data ready for business intelligence.

🏗️ **Key Points**:
- **Modern Data Stack**: Python ingestion, GCS storage, and BigQuery data warehousing.
- **Orchestration**: End-to-end automation of data flows using Apache Airflow.
- **Impact**: Elimination of manual tasks (-90% time) and delivery of clean, reliable data.`,
            },
            stack: ["SQL", "Airflow", "BigQuery", "GCP", "ETL", "Python", "BI"],
            tags: ["SQL", "Airflow", "BigQuery", "GCP", "ETL", "Python", "BI"],
            images: [
                "assets/img/Taxi_new_york.jpeg",
                "assets/img/Airflow.png",
                // "assets/img/composer.png",
                "assets/img/Graphique_Airflow.png",
                "assets/img/code_Airflow.png",


            ],
            video: "assets/img/Etl_taxis.mp4",
            links: {
                github: "https://github.com/kyser131997/data-pipeline-etl",
                //demo: "https://github.com/kyser131997/data-pipeline-etl"
            },
            role: {
                fr: "Data Engineer",
                en: "Data Engineer"
            },
            impact: {
                fr: "Réduction du temps de traitement des données.",
                en: "Reduction of data processing time."
            },
            date: "2026"
        },
        {
            id: 4,
            title: "Prédiction du non-renouvellement de contrats de Location Longue Durée (LLD)",
            shortDescription: {
                fr: "prédiction du non-renouvellement de contrats de Location Longue Durée (LLD)",
                en: "Prediction of non-renewal of contracts for long-term lease (LLD)."
            },
            fullDescription: {
                fr: `🎯 **Objectif** : Prédire le non-renouvellement des contrats de Location Longue Durée (LLD).

🌟 **Expertise** : Développement d'une application qui permet de prédire le non-renouvellement des contrats de Location Longue Durée (LLD).

🏗️ **Points clés** :
- **Application** : Ce projet vise à anticiper les contrats de Location Longue Durée susceptibles de ne pas être renouvelés grâce à un modèle de Machine Learning.
À partir de données contractuelles anonymisées, j’ai conçu un pipeline complet intégrant l’analyse exploratoire, la modélisation prédictive (XGBoost), l’évaluation des performances et la restitution des résultats via un tableau de bord interactif sous Streamlit.
L’outil permet d’identifier les clients à risque, de prioriser les actions commerciales et de renforcer la traçabilité des décisions dans une logique métier et juridique, tout en respectant les exigences du RGPD.`,
                en: `🎯 **Objective**: Predict the non-renewal of contracts for long-term lease (LLD).

🌟 **Expertise**: Development of an application that predicts the non-renewal of contracts for long-term lease (LLD).

🏗️ **Key Points**:
- **Application**: This project aims to anticipate long-term lease contracts that are unlikely to be renewed using a Machine Learning model. Based on anonymized contractual data, I designed a complete pipeline that includes exploratory analysis, predictive modeling (XGBoost), performance evaluation, and results presentation through an interactive dashboard in Streamlit. The tool allows for identifying at-risk clients, prioritizing business actions, and strengthening decision traceability in a business and legal context, while complying with GDPR requirements.`,
            },
            stack: ["Machine Learning", "XGBoost", "Streamlit", "Prédiction", "Analyse de risque", "Data for Business", "Python"],
            tags: ["Machine Learning", "XGBoost", "Streamlit", "Prédiction", "Analyse de risque", "Data for Business", "Python"],
            images: [
                "assets/img/LLD/acceuil_LLD.jpeg",
                "assets/img/LLD/client_risque.PNG",
                "assets/img/LLD/analyst_exploratoire.png",
                "assets/img/LLD/comparatif_model.png",
                "assets/img/LLD/courbe_roc.png",
            ],
            video: "assets/img/LLD/prediction_voiture.mp4",
            // video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            links: {
                github: "https://github.com/kyser131997/LLD-Churn-Prediction-Machine-Learning/tree/main",
                demo: "#"
            },
            role: {
                fr: "Consultant Power Platform",
                en: "Power Platform Consultant"
            },
            impact: {
                fr: "Anticipation des contrats de Location Longue Durée susceptibles de ne pas être renouvelés grâce à un modèle de Machine Learning.",
                en: "Anticipation of contracts for long-term lease (LLD) that are unlikely to be renewed using a Machine Learning model."
            },
            date: "2026"
        },
        {
            id: 1,
            title: "Analyse et pilotage financier sur Power BI",
            shortDescription: {
                fr: "Analyse et pilotage financier sur Power BI",
                en: "Financial analysis and Power BI piloting."
            },
            fullDescription: {
                fr: `🎯 **Objectif et Objectif** : J’ai conçu un tableau de bord pour suivre mes finances personnelles et mieux piloter mon budget. L’objectif est de visualiser rapidement l’évolution des dépenses, l’épargne, la répartition des postes et l’atteinte d’objectifs, avec une lecture simple par mois et par année.

🌟 **Expertise** : Mise en place d'un Dashboard Power BI pour suivre mes finances personnelles et mieux piloter mon budget.

🏗️ **Points clés** : 
- **KPIs** : Revenus, Dépenses, Épargne, Taux d’épargne (%).
- **Évolution mensuelle** : Dépenses par mois (tendance).
- **Répartition** : ventilation des dépenses/épargne par catégories (ex. loyers, nourriture, loisirs, etc.).
- **Filtres temporels** : sélection d’année + focus sur un mois.

- **Valeur / résultats** :
- Vue unique pour contrôler le budget et identifier les mois à dérive.
- Mise en évidence des postes dominants et des leviers d’optimisation.
- Suivi du taux d’épargne et comparaison d’une année à l’autre.`,
                en: `🎯 **Objective**  : Modernize reporting architecture by centralizing data flows onto a unified Cloud platform.


🏗️ **Key Points**:
- **KPIs**: Key performance indicators (Revenue, Expenses, Savings, Savings rate (%)).
- **Monthly Evolution**: Expenses by month (trend).
- **Distribution**: Distribution of expenses/savings by categories (e.g. rent, food, leisure, etc.).
- **Temporal Filters**: Select year + focus on a month.
- **Impact**: 
-Unique view to control the budget and identify months to derivate.
- Highlight dominant posts and optimization levers.
- Track savings rate and compare year to year.`,
            },
            stack: ["Microsoft Fabric", "Power BI", "Data Factory", "Lakehouse", "ETL", "BI"],
            tags: ["Microsoft Fabric", "Power BI", "Data Factory", "Lakehouse", "ETL", "BI"],
            images: [
                "assets/img/finance_dashboard/acceuil2.jpeg",
                //"https://picsum.photos/seed/p3-2/800/600",
                //"https://picsum.photos/seed/p3-3/800/600"
            ],
            //video: "assets/img/Etl_taxis.mp4",
            // video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            links: {
                github: "https://github.com/kyser131997/Dashboard-Finances-Power-BI-/tree/main",
                demo: "#"
            },
            role: {
                fr: "BI Analyst",
                en: "BI Analyst"
            },
            impact: {
                fr: "Ce dashboard m’a permis de transformer des données financières brutes en indicateurs clairs pour piloter efficacement mon budget et optimiser mon épargne.",
                en: "This dashboard allowed me to transform raw financial data into clear indicators to effectively pilot my budget and optimize my savings."
            },
            date: "2026"
        },
        {
            id: 3,
            title: "Smart Productivity Cockpit : Analyseur de Performance & Pilotage de Tâches",
            shortDescription: {
                fr: "Application intelligente de monitoring de la productivité et gestion de flux de travail.",
                en: "Intelligent productivity monitoring application and workflow management."
            },
            fullDescription: {
                fr: `🎯 **Objectif** : Transformer la gestion des tâches quotidiennes en un véritable centre de pilotage analytique. Cette application, développée sous Streamlit, dépasse la simple liste pour offrir un suivi précis de la performance individuelle.

🌟 **Expertise** : Maîtrise de l’interactivité en Python et de la structure de données persistante (JSON) pour une autonomie totale sans dépendance SQL.

🏗️ **Points clés** :
- **Monitoring Analytique** : Visualisation en temps réel de la productivité par catégorie.
- **Data Persistence** : Architecture optimisée pour le stockage local via JSON.
- **Workflow Intelligent** : Archivage automatique et édition dynamique via popovers.
- **Filtres Avancés** : Segmentation par priorité, statut et échéance.

🏗️ **Valeur Ajoutée** :
- Optimisation du cycle de travail quotidien.
- Traçabilité complète des habitudes et de la performance.
- Interface moderne "Cockpit" pour une expérience utilisateur premium.`,
                en: `🎯 **Objective**: Transform daily task management into a true analytical control center. This application, developed under Streamlit, goes beyond a simple list to offer precise tracking of individual performance.

🌟 **Expertise**: Mastery of Python interactivity and persistent data structures (JSON) for total autonomy without SQL dependencies.

🏗️ **Key Points**:
- **Analytical Monitoring**: Real-time visualization of productivity by category.
- **Data Persistence**: Optimized architecture for local storage via JSON.
- **Intelligent Workflow**: Automatic archiving and dynamic editing through popovers.
- **Advanced Filters**: Segmentation by priority, status, and deadline.

🏗️ **Added Value**:
- Optimization of the daily work cycle.
- Full traceability of habits and of performance.
- Modern "Cockpit" interface for a premium user experience.`,
            },
            stack: ["Python", "Streamlit", "Pandas", "Json"],
            tags: ["Python", "Streamlit", "Pandas", "Json"],
            images: [
                "assets/img/Liste_tâches/acceuil.png",
                "assets/img/Liste_tâches/statistique.png",
                "assets/img/Liste_tâches/historique.png",

            ],
            video: "assets/img/Liste_tâches/achat.mp4",
            // video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            links: {
                github: "https://github.com/kyser131997/Dashboard-de-gestion-de-t-ches",
                demo: "#"
            },
            role: {
                fr: "Data Scientist",
                en: "Data Scientist"
            },
            impact: {
                fr: "Permet d’organiser, analyser et piloter efficacement les tâches quotidiennes grâce à une application interactive et des indicateurs de productivité.",
                en: "Permit to organize, analyze and effectively pilot daily tasks through an interactive application and productivity indicators."
            },
            date: "2026"
        }

    ],
    experiences: [
        {
            company: "BPCE LEASE (Banque Populaire Caisse d'Epargne)",
            location: "Paris",
            role: {
                fr: "DATA ANALYST BUSINESS",
                en: "BUSINESS DATA ANALYST"
            },
            period: "Sept 2024 → Sept 2025",
            tasks: {
                fr: [
                    " Conception et automatisation de reportings opérationnels et financiers couvrant les activités de crédit-bail mobilier et immobilier, de location longue durée (LLD) et d’énergies renouvelables.",
                    "Exploitation des données du site internet MyCarLease pour concevoir un tableau de bord interactif pour le suivi du parcours client.",
                    "Validation et tests de cohérence entre les environnements UAT et production pour garantir la fiabilité et la qualité des données.",
                    "Collaboration étroite avec les équipes CBM et LLD pour comprendre et formaliser les besoins analytiques.",
                    "Écriture de requêtes SQL complexes pour l’extraction, la transformation et l’analyse de données crédit-bail mobilier.",
                    "Développement de scripts Python pour l’extraction automatisée de plus de 1 000 leads entreprises par mois.",
                    "Développement d’un modèle de machine learning (l'IA) permettant d’identifier les clients à risque de non-renouvellement en location longue durée, améliorant la détection et la rétention client.",
                    "Suivi des tickets Jira et rédaction de la documentation technique sur Confluence.",
                    "Création de pipelines automatisés traitant plus de 500 MB de données internes afin de fiabiliser les flux analytiques."
                ],
                en: [
                    "Reporting Automation: Design and automation of operational and financial reports covering equipment and real estate leasing, long-term leasing (LLD), and renewable energies.",
                    "Data Collection & Analysis: Leveraging MyCarLease website data to design an interactive dashboard for customer journey tracking.",
                    "Data Quality & Control: Validation and consistency testing between UAT and production environments to ensure data reliability and quality.",
                    "Business Requirements Analysis: Close collaboration with equipment leasing (CBM) and long-term leasing (LLD) teams to understand and formalize analytical needs.",
                    "SQL: Writing complex SQL queries for extraction, transformation, and analysis of equipment leasing data.",
                    "Web Scraping: Development of Python scripts for automated extraction of over 1,000 corporate leads per month.",
                    "Predictive Modeling: Development of a Machine Learning model (AI) to identify customers at risk of non-renewal in long-term leasing, improving customer detection and retention.",
                    "Documentation & Collaboration: Jira ticket tracking and technical documentation writing on Confluence.",
                    "Data Pipelines (ETL): Creation of automated pipelines processing over 500 MB of internal data to enhance analytical flow reliability."
                ]
            }
        },
        {
            company: "Restaurant Chips & Chicken",
            location: "Paris",
            role: {
                fr: "DATA ENGINEER ",
                en: "DATA ENGINEER "
            },
            period: "Oct 2023 → Fév 2024",
            tasks: {
                fr: [
                    "Intégration et centralisation de données issues de fichiers CSV stockés sur Google Drive.",
                    "Chargement des données dans une base connectée à Metabase via clé SSH.",
                    "Automatisation du pipeline ETL avec Apache Airflow pour le traitement de données.",
                    "Analyse et requêtes SQL pour le suivi des ventes et la performance opérationnelle.",
                    "Connexion de la base à Power BI pour la création de tableaux de bord interactifs."
                ],
                en: [
                    "Integration and centralization of data from CSV files stored on Google Drive.",
                    "Data loading into a database connected to Metabase via SSH key.",
                    "Automation of the ETL pipeline with Apache Airflow for data processing.",
                    "SQL analysis and queries for sales tracking and operational performance.",
                    "Database connection to Power BI for creating interactive dashboards."
                ]
            },
            tags: ["Data Engineer", "ETL", "Airflow", "SQL", "Power BI"]
        },
        {
            company: "GAM GABON",
            location: "Gabon",
            role: {
                fr: "DATA ANALYST ",
                en: "DATA ANALYST "
            },
            period: "Juil 2022 → Août 2023",
            tasks: {
                fr: [
                    "Étude approfondie de plus de 10 000 profils clients pour identifier des tendances comportementales et définir des segments stratégiques à forte valeur commerciale.",
                    "Mise en place et suivi de KPIs clés ayant permis d’améliorer la productivité des équipes.",
                    "Proposition d’axes d’amélioration pour l’orientation marketing et la fidélisation client."
                ],
                en: [
                    "In-depth study of over 10,000 customer profiles to identify behavioral trends and define strategic high-value commercial segments.",
                    "Implementation and monitoring of key KPIs that improved team productivity.",
                    "Proposal of improvement areas for marketing orientation and customer loyalty."
                ]
            }
        },
        {
            company: "GABON Télévision",
            location: "Gabon",
            role: {
                fr: "DEVELOPPEUR WEB",
                en: "WEB DEVELOPER"
            },
            period: "Sept 2021 → Avr 2022",
            tasks: {
                fr: [
                    "Mise en place d'une application de gestion des temps d'absence.",
                    "Participation à la création du site internet de la chaîne nationale."
                ],
                en: [
                    "Implementation of an absence management application.",
                    "Participation in the creation of the national TV channel's website."
                ]
            }
        }
    ],
    formation: [
        {
            degree: {
                fr: "Master of Science Data Management",
                en: "Master of Science in Data Management"
            },
            school: "Aivancity",
            period: "2023 → 2025",
            details: {
                fr: "Soutenance mémoire 18,5/20 — Paris/Cachan",
                en: "Thesis defense 18.5/20 — Paris/Cachan"
            }
        },
        {
            degree: {
                fr: "Licence Pro Multimédia & Internet",
                en: "Professional License in Multimedia & Internet"
            },
            school: "INPTIC",
            period: "2021 → 2022",
            details: "Libreville"
        }
    ],
    skills: [
        {
            category: { fr: "Langages & Data Tools", en: "Languages & Data Tools" },
            items: ["Python", "SQL", "R", "Power BI", "Tableau", "Excel avancé", "SAS", "Looker Studio"]
        },
        {
            category: { fr: "Cloud & Big Data", en: "Cloud & Big Data" },
            items: ["Azure", "Fabric", "Databricks", "Snowflake", "AWS", "GCP", "BigQuery", "SQL Server", "PostgreSQL"]
        },
        {
            category: { fr: "ETL & Data Engineering", en: "ETL & Data Engineering" },
            items: ["Airflow", "DBT", "Docker", "Power Automate", "Pipelines de données"]
        },
        {
            category: { fr: "ML & IA", en: "ML & AI" },
            items: ["Modélisation prédictive", "NLP", "IA Générative (LLM, RAG, GPT)", "Prompt Engineering"]
        },
        {
            category: { fr: "Gestion de projet", en: "Project Management" },
            items: ["Agile", "Scrum", "Jira", "Confluence", "Trello"]
        },
        {
            category: { fr: "Soft skills", en: "Soft skills" },
            items: ["Travail en équipe", "Bon communicant", "Force de proposition", "Autonome", "Assidu"]
        }
    ],
    certifications: [
        {
            name: "Microsoft Certified: Power BI Data Analyst Associate",
            year: "2024"
        }
    ],
    testimonials: [
        {
            name: "Jean Dupont",
            role: "Directeur Data @ Fintech",
            text: {
                fr: "Nicodème a su transformer nos processus BI avec une efficacité remarquable.",
                en: "Nicodème transformed our BI processes with remarkable efficiency."
            }
        },
        {
            name: "Sarah Martin",
            role: "Chef de projet Agile",
            text: {
                fr: "Un expert data qui comprend les enjeux business. Très pro !",
                en: "A data expert who understands business stakes. Very professional!"
            }
        }
    ]
};


