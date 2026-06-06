# Portfolio Content

This file contains all the personal information displayed in the portfolio.
Edit anything here, then ask to sync it back into the data files.

---

## Hero / Identity

**Name:** Dries Van den Brande  
**Handle:** dvdb.dev  
**GitHub username:** dvdbdev  
**Email:** hello@dvdb.dev  
**LinkedIn:** linkedin.com/in/dvdbdev  
**Location:** Belgium  

**Tagline / intro (pick one or write your own):**
- "Programming student building full-stack apps, data tools, and ML experiments."
- "I like practical software — dashboards, internal tools, pipelines, clean UIs."
- "Student developer from Belgium. I build things to learn, and learn by building things."

**Open to:**
- Internships
- Junior developer roles
- Collaborations on interesting projects
- Anything in data engineering, ML tooling, or full-stack development

---

## Engineering Journey (Timeline)

| Year   | Title                               | Description                                                                                                                                                                                                                                                                         | Tags                                                   | Type      |
| ------ | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | --------- |
| 2023   | Started at Campus 19                | Started programming seriously at Campus 19. Learned by solving practical coding challenges, working mainly with C and C++. Completed 3 rings and built a stronger foundation in problem solving, debugging, and thinking like a developer.                                          | Campus 19, C, C++, Problem solving                     | study     |
| 2024   | Started Graduaat Programmeren at AP | Started the Graduaat Programmeren at AP Hogeschool in September 2024. Continued building my foundation in software development, web development, databases, and project-based work.                                                                                                 | AP Hogeschool, Programming, Web development, Databases | study     |
| 2025   | Internship at BASF                  | Started my internship at BASF in September 2025. Worked in a professional environment on practical software and data-related tasks. Got more exposure to Python, internal tooling, dashboards, and how software is used inside a larger company.                                    | Internship, BASF, Python, Data tooling                 | work      |
| 2026   | Completed BASF internship           | Completed my BASF internship in June 2026. The experience made me more interested in data engineering, machine learning tooling, dashboards, and building software that supports real workflows.                                                                                    | BASF, Internship, Data engineering, ML tooling         | milestone |
| 2026 → | Growing toward data & ML systems    | Currently focused on becoming stronger as a junior developer, with a growing interest in data engineering, ML systems, internal tools, and clean full-stack applications. Looking for an internship, junior role, or technical collaboration where I can keep learning by building. | Data engineering, ML systems, Junior developer         | milestone |


---

## How I Think (Principles)

1. **Build things that can grow**
   I try to think past the immediate feature. Not in an over-engineered way — just: will this make sense in 3 months? Can someone else follow it?

2. **Remove friction where you find it**
   Annoying workflows slow you down over time. When something is consistently painful — a setup step, a repeated task, a confusing interface — I'd rather fix it than get used to it.

3. **DX matters**
   How a tool feels to use affects whether it gets used well. I care about error messages, CLI output, onboarding steps. Not just the end result.

4. **Clear is better than clever**
   I've written code I couldn't read two weeks later. Clear naming, obvious structure, and predictable data flow are not beginner habits — they're good ones.

5. **Automate the boring parts**
   If I'm doing something manually for the third time, I should probably automate it. Not everything needs a framework — sometimes a script is enough.

6. **Write for the next person (usually future me)**
   I try to write code as if someone else will need to understand it. That "someone else" has been me enough times that I've learned to take it seriously.

7. **The best way to learn is to ship**
   Reading about something only goes so far. I learn more from a broken deployment or a failing test than from a course. Real projects have edges that tutorials don't.

8. **Know what's slow before you fix it**
   Optimizing randomly is mostly wasted effort. I try to understand the actual bottleneck before changing anything.

---

## Tech Stack

### Comfortable with

* **Python** — My main language for data work, automation, scripting, and ML-related experiments.
* **TypeScript** — Used in most of my web projects. I prefer it over plain JavaScript because it keeps projects easier to maintain.
* **SQL** — Used for queries, schema design, and working with relational data. Mostly Postgres, with some SQLite and Spark SQL.
* **Next.js** — My main framework for full-stack web apps. Used for personal projects, dashboards, and portfolio work.
* **Supabase** — Used in personal projects for authentication, databases, and quickly building full-stack apps on top of Postgres.
* **Dash** — Used during my BASF internship to build Python-based dashboard and self-service tooling around data and AI workflows.

### Used in projects, still improving

* **React** — Used together with Next.js for building interfaces, components, forms, dashboards, and project pages.
* **Databricks** — Used in project work around data workflows and ML pipeline execution. I am still learning the platform, but I understand the basics.
* **Azure** — Used in the context of data and ML projects, mainly around compute, storage, and cloud-based workflows.
* **CI/CD** — Basic experience with GitHub Actions for running checks, tests, and simple deployment workflows.
* **Testing practices** — Actively improving how I write useful tests for both backend logic and frontend behavior.

### Currently exploring

* **Data engineering patterns** — Pipeline design, data modeling, validation, batch processing, and eventually stream processing.
* **ML systems** — How models are trained, evaluated, tracked, and connected to real workflows.
* **Developer tooling** — Building small tools that make repetitive work easier, clearer, or more automated.


---

## Projects (System Registry)

### BASF Self-Service AI Configuration App

* **Status:** used during internship / active product work
* **Stack:** Python, Dash, Databricks, Azure, SQL, Spark
* **Description:** A self-service app built during my BASF internship. The goal was to let different BASF installations configure their own AI solutions without having to start from scratch every time. Users could select data sources, define preprocessing steps, configure calculations, and choose modular models like KNN for similar-day analysis or regression models to predict values.
* **What I worked on:** I helped build out the app, improved the structure, worked on the Dash interface, and contributed to the architecture around reusable configuration and model workflows.
* **What I learned:** This was the first project where I really felt ownership over a product. I learned how important it is to build software that fits real workflows, not just technically correct features. It also made me much more interested in data tooling, ML systems, and internal software.

---

### No-Code Calculation Builder

* **Status:** built during BASF internship
* **Stack:** Python, Dash, Spark, SQL
* **Description:** A no-code tool that lets users define mathematical calculations on top of sensor data. For example, if an installation has two pipes and wants to calculate the total output, the user can configure that calculation without writing code. Behind the scenes, the app generates the Spark logic needed to calculate the resulting time series.
* **What I worked on:** I helped build the configuration flow and the logic that translates user-defined calculations into executable Spark code.
* **What I learned:** I learned how difficult it is to make technical tools usable for non-developers. The hard part is not only generating the correct code, but also designing the flow so users understand what they are building.

---

### Python Testing Framework

* **Status:** built during BASF internship
* **Stack:** Python, Pytest, Markdown, Coverage
* **Description:** A Python testing framework that automatically looks for Pytest files and executes them. It can generate a Markdown report after the test run and optionally include a coverage report. BASF wanted a Cucumber/Gherkin-inspired testing approach that could work together with agent skills, so I built a solution around that idea.
* **What I worked on:** I created the test discovery flow, execution logic, reporting output, and optional coverage integration.
* **What I learned:** I learned that testing tools are only useful if the output is easy to understand. A good report should help someone quickly see what passed, what failed, and where to look next.

---

### Journey — Internship Blog Platform

* **Status:** live / personal project
* **Stack:** Next.js, TypeScript, Supabase, SQL
* **Live project:** https://internship-blog-app.onrender.com
* **Description:** A blog platform I created to document my BASF internship. I wrote 15 weeks of blog posts about what I worked on, what I learned, and how the internship evolved over time.
* **What I worked on:** I built the full-stack app, including the blog structure, routing, database setup, and publishing flow.
* **What I learned:** This project helped me combine software development with reflection. It also gave me a real reason to build a blogging system instead of just making another demo project.

---

### Portfolio — Telemetry Style

* **Status:** in progress
* **Stack:** Next.js, TypeScript
* **Description:** My current personal portfolio. The design is inspired by telemetry dashboards: system status, activity logs, project cards, and a darker technical interface. The goal is to make the portfolio feel more like a developer dashboard than a standard personal website.
* **What I am working on:** Rewriting the content, cleaning up fake or exaggerated text, improving the project structure, and making the site feel honest while still having a strong visual identity.
* **What I am learning:** How to present myself better as a junior developer without overclaiming. I want the portfolio to show what I can build, what I am learning, and what kind of work I want to do next.


---

## System Activity Log (Telemetry Feed)

> This is a design element — a styled activity feed showing recent work.
> Entries are written manually and updated periodically. Not a live system log.

| Date       | Message                                                                       | System              | Level   |
| ---------- | ----------------------------------------------------------------------------- | ------------------- | ------- |
| 2026-06-06 | Finalizing portfolio content — cleaning up project copy and timeline          | portfolio           | success |
| 2026-06-05 | Reworked portfolio structure with mock telemetry data and project cards       | portfolio           | info    |
| 2026-06-04 | Started shaping the portfolio into a darker telemetry-style dashboard         | portfolio           | info    |
| 2026-05-30 | Wrapped up BASF internship work and documented final project progress         | basf-internship     | success |
| 2026-05-15 | Improved testing framework reporting — Markdown output and optional coverage  | testing-framework   | success |
| 2026-04-18 | Worked on Gherkin-inspired test flow for agent skill validation               | testing-framework   | info    |
| 2026-03-22 | Built no-code calculation flow for sensor-based time series data              | calculation-builder | success |
| 2026-02-14 | Improved Dash UI for self-service AI configuration workflows                  | self-service-ai     | info    |
| 2026-01-10 | Worked on modular model configuration — KNN and regression workflows          | self-service-ai     | debug   |
| 2025-11-28 | Connected configuration steps to Databricks/Spark execution logic             | self-service-ai     | info    |
| 2025-10-17 | Built reusable Dash components for internal data tooling                      | dashboard-tooling   | success |
| 2025-09-22 | Started BASF internship — onboarding into data, AI, and internal tooling work | basf-internship     | info    |


