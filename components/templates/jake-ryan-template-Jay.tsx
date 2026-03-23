import React from "react";

export default function JakeRyanResume({ data }: any) {
  return (
    <div className="flex justify-center min-h-screen bg-gray-100 py-8">
      <div
        className="bg-white shadow-lg"
        style={{
          width: "816px",
          height: "1056px",
          padding: "50px 60px",
          fontFamily:
            '"Computer Modern Serif", "Times New Roman", Georgia, serif',
          fontSize: "10.5pt",
          lineHeight: "1.18",
          color: "#000",
        }}
      >
        {/* HEADING */}
        <div className="text-center" style={{ marginBottom: "6px" }}>
          <h1
            style={{
              fontSize: "28pt",
              fontWeight: "normal",
              letterSpacing: "0.5px",
              marginBottom: "1px",
              fontVariant: "small-caps",
            }}
          >
            First Last
          </h1>
          <div style={{ fontSize: "9.5pt", marginTop: "1px" }}>
            123-456-7890 |{" "}
            <a
              href="mailto:jake@su.edu"
              style={{ color: "#000", textDecoration: "underline" }}
            >
              jake@su.edu
            </a>{" "}
            |{" "}
            <a
              href="https://linkedin.com/in/jake"
              style={{ color: "#000", textDecoration: "underline" }}
            >
              linkedin.com/in/jake
            </a>{" "}
            |{" "}
            <a
              href="https://github.com/jake"
              style={{ color: "#000", textDecoration: "underline" }}
            >
              github.com/jake
            </a>
          </div>
        </div>

        {/* EDUCATION SECTION */}
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <h2
            style={{
              fontSize: "11pt",
              fontWeight: "normal",
              letterSpacing: "1px",
              fontVariant: "small-caps",
              marginBottom: "3px",
              paddingBottom: "2px",
              borderBottom: "0.75px solid #000",
            }}
          >
            Education
          </h2>

          <div
            style={{
              marginTop: "5px",
              marginBottom: "5px",
              paddingLeft: "12px",
              paddingRight: "12px",
            }}
          >
            <div
              className="flex justify-between"
              style={{ marginBottom: "1px" }}
            >
              <div style={{ fontWeight: "bold", fontSize: "10.5pt" }}>
                University Name
              </div>
              <div style={{ fontSize: "10.5pt" }}>Georgetown, TX</div>
            </div>
            <div
              className="flex justify-between"
              style={{ fontSize: "9.5pt", fontStyle: "italic" }}
            >
              <div>Bachelor of Arts in Computer Science, Minor in Business</div>
              <div>Aug. 2018 – May 2021</div>
            </div>
          </div>

          <div
            style={{
              marginTop: "5px",
              marginBottom: "5px",
              paddingLeft: "12px",
              paddingRight: "12px",
            }}
          >
            <div
              className="flex justify-between"
              style={{ marginBottom: "1px" }}
            >
              <div style={{ fontWeight: "bold", fontSize: "10.5pt" }}>
                College Name
              </div>
              <div style={{ fontSize: "10.5pt" }}>Bryan, TX</div>
            </div>
            <div
              className="flex justify-between"
              style={{ fontSize: "9.5pt", fontStyle: "italic" }}
            >
              <div>Associate's in Liberal Arts</div>
              <div>Aug. 2014 – May 2018</div>
            </div>
          </div>
        </div>

        {/* EXPERIENCE SECTION */}
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <h2
            style={{
              fontSize: "11pt",
              fontWeight: "normal",
              letterSpacing: "1px",
              fontVariant: "small-caps",
              marginBottom: "3px",
              paddingBottom: "2px",
              borderBottom: "0.75px solid #000",
            }}
          >
            Experience
          </h2>

          {/* Job 1 */}
          <div
            style={{
              marginTop: "5px",
              marginBottom: "7px",
              paddingLeft: "12px",
              paddingRight: "12px",
            }}
          >
            <div
              className="flex justify-between"
              style={{ marginBottom: "1px" }}
            >
              <div style={{ fontWeight: "bold", fontSize: "10.5pt" }}>
                Undergraduate Research Assistant
              </div>
              <div style={{ fontSize: "10.5pt" }}>June 2020 – Present</div>
            </div>
            <div
              className="flex justify-between"
              style={{
                fontSize: "9.5pt",
                fontStyle: "italic",
                marginBottom: "3px",
              }}
            >
              <div>Texas A&M University</div>
              <div>College Station, TX</div>
            </div>
            <ul
              style={{
                listStyleType: "disc",
                marginLeft: "15px",
                fontSize: "9.5pt",
                lineHeight: "1.25",
                paddingLeft: "12px",
                paddingRight: "12px",
              }}
            >
              <li style={{ marginBottom: "1.5px", paddingLeft: "2px" }}>
                Developed a REST API using FastAPI and PostgreSQL to store data
                from learning management systems
              </li>
              <li style={{ marginBottom: "1.5px", paddingLeft: "2px" }}>
                Developed a full-stack web application using Flask, React,
                PostgreSQL and Docker to analyze GitHub data
              </li>
              <li style={{ marginBottom: "1.5px", paddingLeft: "2px" }}>
                Explored ways to visualize GitHub collaboration in a classroom
                setting
              </li>
            </ul>
          </div>

          {/* Job 2 */}
          <div
            style={{
              marginTop: "5px",
              marginBottom: "7px",
              paddingLeft: "12px",
              paddingRight: "12px",
            }}
          >
            <div
              className="flex justify-between"
              style={{ marginBottom: "1px" }}
            >
              <div style={{ fontWeight: "bold", fontSize: "10.5pt" }}>
                Information Technology Support Specialist
              </div>
              <div style={{ fontSize: "10.5pt" }}>Sep. 2018 – Present</div>
            </div>
            <div
              className="flex justify-between"
              style={{
                fontSize: "9.5pt",
                fontStyle: "italic",
                marginBottom: "3px",
              }}
            >
              <div>Southwestern University</div>
              <div>Georgetown, TX</div>
            </div>
            <ul
              style={{
                listStyleType: "disc",
                marginLeft: "15px",
                paddingLeft: "12px",
                paddingRight: "12px",
                fontSize: "9.5pt",
                lineHeight: "1.25",
              }}
            >
              <li style={{ marginBottom: "1.5px", paddingLeft: "2px" }}>
                Communicate with managers to set up campus computers used on
                campus
              </li>
              <li style={{ marginBottom: "1.5px", paddingLeft: "2px" }}>
                Assess and troubleshoot computer problems brought by students,
                faculty and staff
              </li>
              <li style={{ marginBottom: "1.5px", paddingLeft: "2px" }}>
                Maintain upkeep of computers, classroom equipment, and 200
                printers across campus
              </li>
            </ul>
          </div>

          {/* Job 3 */}
          <div
            style={{
              marginTop: "5px",
              marginBottom: "7px",
              paddingLeft: "12px",
              paddingRight: "12px",
            }}
          >
            <div
              className="flex justify-between"
              style={{ marginBottom: "1px" }}
            >
              <div style={{ fontWeight: "bold", fontSize: "10.5pt" }}>
                Artificial Intelligence Research Assistant
              </div>
              <div style={{ fontSize: "10.5pt" }}>May 2019 – July 2019</div>
            </div>
            <div
              className="flex justify-between"
              style={{
                fontSize: "9.5pt",
                fontStyle: "italic",
                marginBottom: "3px",
              }}
            >
              <div>Southwestern University</div>
              <div>Georgetown, TX</div>
            </div>
            <ul
              style={{
                listStyleType: "disc",
                marginLeft: "15px",
                paddingLeft: "12px",
                paddingRight: "12px",
                fontSize: "9.5pt",
                lineHeight: "1.25",
              }}
            >
              <li style={{ marginBottom: "1.5px", paddingLeft: "2px" }}>
                Explored methods to generate video game dungeons based off of{" "}
                <em>The Legend of Zelda</em>
              </li>
              <li style={{ marginBottom: "1.5px", paddingLeft: "2px" }}>
                Developed a game in Java to test the generated dungeons
              </li>
              <li style={{ marginBottom: "1.5px", paddingLeft: "2px" }}>
                Contributed 50K+ lines of code to an established codebase via
                Git
              </li>
              <li style={{ marginBottom: "1.5px", paddingLeft: "2px" }}>
                Conducted a human subject study to determine which video game
                dungeon generation technique is enjoyable
              </li>
              <li style={{ marginBottom: "1.5px", paddingLeft: "2px" }}>
                Wrote an 8-page paper and gave multiple presentations on-campus
              </li>
              <li style={{ marginBottom: "1.5px", paddingLeft: "2px" }}>
                Presented virtually to the World Conference on Computational
                Intelligence
              </li>
            </ul>
          </div>
        </div>

        {/* PROJECTS SECTION */}
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <h2
            style={{
              fontSize: "11pt",
              fontWeight: "normal",
              letterSpacing: "1px",
              fontVariant: "small-caps",
              marginBottom: "3px",
              paddingBottom: "2px",
              borderBottom: "0.75px solid #000",
            }}
          >
            Projects
          </h2>

          {/* Project 1 */}
          <div
            style={{
              marginTop: "5px",
              marginBottom: "7px",
              paddingLeft: "12px",
              paddingRight: "12px",
            }}
          >
            <div
              className="flex justify-between"
              style={{ marginBottom: "3px" }}
            >
              <div style={{ fontSize: "9.5pt" }}>
                <span style={{ fontWeight: "bold" }}>Gitlytics</span>
                <span style={{ fontStyle: "italic" }}>
                  {" "}
                  | Python, Flask, React, PostgreSQL, Docker
                </span>
              </div>
              <div style={{ fontSize: "9.5pt" }}>June 2020 – Present</div>
            </div>
            <ul
              style={{
                listStyleType: "disc",
                marginLeft: "15px",
                fontSize: "9.5pt",
                lineHeight: "1.25",
                paddingLeft: "12px",
                paddingRight: "12px",
              }}
            >
              <li style={{ marginBottom: "1.5px", paddingLeft: "2px" }}>
                Developed a full-stack web application using with Flask serving
                a REST API with React as the frontend
              </li>
              <li style={{ marginBottom: "1.5px", paddingLeft: "2px" }}>
                Implemented GitHub OAuth to get data from user's repositories
              </li>
              <li style={{ marginBottom: "1.5px", paddingLeft: "2px" }}>
                Visualized GitHub data to show collaboration
              </li>
              <li style={{ marginBottom: "1.5px", paddingLeft: "2px" }}>
                Used Celery and Redis for asynchronous tasks
              </li>
            </ul>
          </div>

          {/* Project 2 */}
          <div
            style={{
              marginTop: "5px",
              marginBottom: "7px",
              paddingLeft: "12px",
              paddingRight: "12px",
            }}
          >
            <div
              className="flex justify-between"
              style={{ marginBottom: "3px" }}
            >
              <div style={{ fontSize: "9.5pt" }}>
                <span style={{ fontWeight: "bold" }}>Simple Paintball</span>
                <span style={{ fontStyle: "italic" }}>
                  {" "}
                  | Spigot API, Java, Maven, TravisCI, Git
                </span>
              </div>
              <div style={{ fontSize: "9.5pt" }}>May 2018 – May 2020</div>
            </div>
            <ul
              style={{
                listStyleType: "disc",
                marginLeft: "15px",
                paddingLeft: "12px",
                paddingRight: "12px",
                fontSize: "9.5pt",
                lineHeight: "1.25",
              }}
            >
              <li style={{ marginBottom: "1.5px", paddingLeft: "2px" }}>
                Developed a Minecraft server plugin to entertain kids during
                free time for a previous job
              </li>
              <li style={{ marginBottom: "1.5px", paddingLeft: "2px" }}>
                Published plugin to websites gaining 2K+ downloads and an
                average 4.5/5-star review
              </li>
              <li style={{ marginBottom: "1.5px", paddingLeft: "2px" }}>
                Implemented continuous delivery using TravisCI to build the
                plugin upon new a release
              </li>
              <li style={{ marginBottom: "1.5px", paddingLeft: "2px" }}>
                Collaborated with Minecraft server administrators to suggest
                features and get feedback about the plugin
              </li>
            </ul>
          </div>
        </div>

        {/* TECHNICAL SKILLS SECTION */}
        <div style={{ marginTop: "10px" }}>
          <h2
            style={{
              fontSize: "11pt",
              fontWeight: "normal",
              letterSpacing: "1px",
              fontVariant: "small-caps",
              marginBottom: "3px",
              paddingBottom: "2px",
              borderBottom: "0.75px solid #000",
            }}
          >
            Technical Skills
          </h2>

          <div
            style={{
              fontSize: "9.5pt",
              lineHeight: "1.35",
              marginTop: "5px",
              marginLeft: "0px",
              paddingLeft: "12px",
              paddingRight: "12px",
            }}
          >
            <div style={{ marginBottom: "2px" }}>
              <span style={{ fontWeight: "bold" }}>Languages</span>: Java,
              Python, C/C++, SQL (Postgres), JavaScript, HTML/CSS, R
            </div>
            <div style={{ marginBottom: "2px" }}>
              <span style={{ fontWeight: "bold" }}>Frameworks</span>: React,
              Node.js, Flask, JUnit, WordPress, Material-UI, FastAPI
            </div>
            <div style={{ marginBottom: "2px" }}>
              <span style={{ fontWeight: "bold" }}>Developer Tools</span>: Git,
              Docker, TravisCI, Google Cloud Platform, VS Code, Visual Studio,
              PyCharm, IntelliJ, Eclipse
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>Libraries</span>: pandas,
              NumPy, Matplotlib
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
