import React from "react";

interface IDCardProps {
  name: string;
  designation?: string; // For teachers
  subject?: string; // For teachers
  class?: string; // For students
  rollNo?: string; // For students
  admissionNo?: string; // For students
  fatherName?: string; // For students
  doj?: string; // For teachers (Date of Joining)
  dob: string;
  aadhar: string;
  phone: string;
  bloodGroup: string;
  address: string;
  teacherId?: string; // For teachers
  apaarId?: string; // For students
  photoURL?: string;
  isTeacher?: boolean;
}

const IDCard: React.FC<IDCardProps> = ({
  name,
  designation,
  subject,
  class: studentClass,
  rollNo,
  admissionNo,
  fatherName,
  doj,
  dob,
  aadhar,
  phone,
  bloodGroup,
  address,
  teacherId,
  apaarId,
  photoURL,
  isTeacher = false,
}) => {
  return (
    <div className="cust-card-wrapper">
      <div className="id-card">
        <style>{`
          .cust-card-wrapper {
            // all: unset;
            // width: calc(486px * 0.6667); /* ≈ 324px */
            // height: calc(306px * 0.6667); /* ≈ 204px */
            width: 100%;
            // height: 100%;
            // width: 500px;
            height: 370px;
            // display: flex;
            // justify-content: center;
            // align-items: center;
          }
        .id-card {
          all: unset;
          // transform: scale(0.6667);
          width: 486px;
          height: 306px;
          border: 1px solid #ccc;
          border-radius: 10px;
          padding: 10px 15px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          position: absolute;
          // position: relative;
          font-family: Arial, sans-serif;
          }
          .
          .card-wrapper {
            // width: calc(486px * 0.6667); /* ≈ 324px */
            // height: calc(306px * 0.6667); /* ≈ 204px */
            // overflow: hidden;
            // display: flex;
            // align-items: start;
            // justify-content: start;
          }
        @media print {
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .id-card {
            transform: scale(0.6667);
            transform-origin: top left;
            // width: 486px;
            // height: 306px;
            // overflow: hidden;
            // box-shadow: none !important;
            // margin: 0;
            // padding: 0;
          }

          .cust-card-wrapper {
            margin-top: 10px;
            width: 100%;
            height: 400px;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #1d3b84;
          color: white;
          padding: 8px;
          border-radius: 8px 8px 0 0;
          margin: -10px -15px 0;
        }

        .logo-left,
        .logo-right {
          width: 60px;
          height: 60px;
          // background-color: #ffffff;
          // border-radius: 4px;
          // display: flex;
          // align-items: center;
          // justify-content: center;
          // font-size: 8px;
          // color: #1d3b84;
          // font-weight: bold;
        }

        .school-info {
          text-align: center;
          flex: 1;
          margin: 0 10px;
          line-height: 1.2;
        }

        .school-info h2 {
          margin-block-start: 0em;
          margin-block-end: 0em;
          margin: 0;
          font-size: 20px;
          color: #ffffff;
          font-weight: bold;
        }

        .school-info p {
          margin: 0;
          font-size: 12px;
        }

        .content {
          display: flex;
          margin-top: 5px;
          position: relative;
          z-index: 1;
        }

        .details {
          flex: 3;
          line-height: 1.4;
          padding-right: 10px;
          font-size: 11px;
          font-weight: bold;
        }

        .details b {
          color: #1d3b84;
          display: inline-block;
          width: 90px;
        }

        .details span {
          display: block;
          margin: 2px 0;
        }

        .photo-section {
          flex: 1;
          text-align: center;
        }

        .photo {
          width: 110px;
          height: 140px;
          border: 1px solid #000;
          margin: 10px 0;
          object-fit: cover;
          object-position: center top;
          background-color: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          font-size: 12px;
        }

        .signature {
          width: 80px;
          height: 30px;
          float: right;
        }

        .footer {
          display: flex;
          position:relative;
          z-index: 1;
          color: #ffffff;
          width: 100%;
          height: 0px;
          justify-content: flex-end;
          align-items: end;
        }

        .bottom-border {
          position: absolute;
          width: 100%;
          height: 25px;
          background: linear-gradient(
            to right,
            #006400 0%,
            #006400 50%,
            #d50000 50%,
            #d50000 100%
          );
          // z-index: -10;
          margin: -21px -15px -15px -15px;
          border-radius: 0 0 8px 8px;
        }

        .teacher-id {
          font-size: 14px;
          font-weight: bold;
          margin-top: ${isTeacher ? "14px" : "5px"};
          color: #ffffff;
        }

        .sign-label {
          font-size: 12px;
          text-align: right;
        }

        .sign-section {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 15px;
        }

        .sign-section img {
          width: 80px;
          height: 30px;
          margin-bottom: 3px;
        }

        
      `}</style>

        <div className="header">
          <img
            src="/Jharkhand_govt_logo.svg"
            alt="Logo Left"
            className="logo-left"
          />
          <div className="school-info">
            <h2>ASTVS DISTRICT CM SOE RANCHI</h2>
            <p style={{ color: "#ffb806" }}>(ZILA SCHOOL RANCHI)</p>
            <p>
              Managed by: Department of School Education and Literacy, Govt. of
              Jharkhand
            </p>
            <p>Affiliated to CBSE NEW DELHI, Affiliation No. : 3420111</p>
            <p>School No.: 68061 | UDISE No. : 20140120009</p>
          </div>
          <img src="/soe_logo.png" alt="Logo Right" className="logo-right" />
        </div>

        <div className="content">
          <div className="details">
            <div style={{ marginBottom: isTeacher ? "13px" : "5px" }}>
              <b
                style={{
                  width: "100%",
                  color: "#d50000",
                  fontSize: isTeacher ? "20px" : "18px",
                  fontWeight: "800",
                }}
              >
                {name.toUpperCase()}
              </b>
            </div>

            {isTeacher ? (
              <>
                <span>
                  <b>Designation</b> : {designation}
                </span>
                <span>
                  <b>Subject</b> : {subject}
                </span>
                <span>
                  <b>D O J</b> : {doj}
                </span>
              </>
            ) : (
              <>
                <span>
                  <b>Class</b> : {studentClass}
                </span>
                <span>
                  <b>Roll No.</b> : {rollNo}
                </span>
                <span>
                  <b>Admisson No.</b> : {admissionNo}
                </span>
                <span>
                  <b>Father's Name</b> : {fatherName}
                </span>
              </>
            )}

            <span>
              <b>D O B</b> : {dob}
            </span>
            <span>
              <b>Aadhar No.</b> : {aadhar}
            </span>
            <span>
              <b>Phone</b> : {phone}
            </span>
            <span>
              <b>Blood Group</b> : {bloodGroup}
            </span>
            <span>
              <b>Address</b> : {address.slice(0, 45)}
              {address.length > 45 ? "..." : ""}
            </span>

            <div className="teacher-id">
              <b style={{ color: "#ffb806" }}>
                {isTeacher ? "Teacher ID" : "APAAR ID"}
              </b>{" "}
              : {isTeacher ? teacherId : apaarId}
            </div>
          </div>

          <div className="photo-section">
            {photoURL ? (
              <img src={photoURL} alt="Person Photo" className="photo" />
            ) : (
              <div className="photo">No Photo</div>
            )}
          </div>
        </div>

        <div className="footer">
          <div className="sign-section">
            <img
              src="/principal_sign.png"
              alt="Principal Sign"
              className="signature"
            />
            <div className="sign-label">Principal Sign</div>
          </div>
        </div>

        <div className="bottom-border"></div>
      </div>
    </div>
  );
};

export default IDCard;
