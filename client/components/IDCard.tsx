import React from 'react';

interface IDCardProps {
  name: string;
  designation?: string;  // For teachers
  subject?: string;      // For teachers
  class?: string;        // For students
  rollNo?: string;       // For students
  admissionNo?: string;  // For students
  fatherName?: string;   // For students
  doj?: string;          // For teachers (Date of Joining)
  dob: string;
  aadhar: string;
  phone: string;
  bloodGroup: string;
  address: string;
  teacherId?: string;    // For teachers
  apaarId?: string;      // For students
  photoURL?: string;
  principalSignURL?: string;
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
  principalSignURL,
  isTeacher = false
}) => {
  return (
    <div className="id-card">
      <style>{`
        .id-card {
          width: 486px;
          height: 306px;
          border: 1px solid #ccc;
          border-radius: 10px;
          padding: 10px 15px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          position: relative;
          background: #ffffff;
          font-family: Arial, sans-serif;
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
          background-color: #ffffff;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8px;
          color: #1d3b84;
          font-weight: bold;
        }

        .school-info {
          text-align: center;
          flex: 1;
          margin: 0 10px;
        }

        .school-info h2 {
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
        }

        .details {
          flex: 3;
          padding-right: 10px;
          font-size: 10px;
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
          z-index: -10;
          margin: -21px -15px -15px -15px;
          border-radius: 0 0 8px 8px;
        }

        .teacher-id {
          font-size: 14px;
          font-weight: bold;
          margin-top: ${isTeacher ? '14px' : '5px'};
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
          background-color: #f0f0f0;
        }

        @media print {
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .id-card {
            transform: scale(0.6667);
            transform-origin: top left;
            width: 486px;
            height: 306px;
            overflow: hidden;
            box-shadow: none !important;
            margin: 0;
            padding: 0;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      <div className="header">
        <div className="logo-left">
          JH LOGO
        </div>
        <div className="school-info">
          <h2>ASTVS DISTRICT CM SOE RANCHI</h2>
          <p style={{ color: '#ffb806' }}>(ZILA SCHOOL RANCHI)</p>
          <p>
            Managed by: Department of School Education and Literacy, Govt. of
            Jharkhand
          </p>
          <p>Affiliated to CBSE NEW DELHI, Affiliation No. : 3420111</p>
          <p>School No.: 68061 | UDISE No. : 20140120009</p>
        </div>
        <div className="logo-right">
          SOE LOGO
        </div>
      </div>

      <div className="content">
        <div className="details">
          <div style={{ marginBottom: isTeacher ? '13px' : '5px' }}>
            <b
              style={{
                width: '100%',
                color: '#d50000',
                fontSize: isTeacher ? '20px' : '18px',
                fontWeight: '800'
              }}
            >
              {name.toUpperCase()}
            </b>
          </div>
          
          {isTeacher ? (
            <>
              <span><b>Designation</b> : {designation}</span>
              <span><b>Subject</b> : {subject}</span>
              <span><b>D O J</b> : {doj}</span>
            </>
          ) : (
            <>
              <span><b>Class</b> : {studentClass}</span>
              <span><b>Roll No.</b> : {rollNo}</span>
              <span><b>Admisson No.</b> : {admissionNo}</span>
              <span><b>Father's Name</b> : {fatherName}</span>
            </>
          )}
          
          <span><b>D O B</b> : {dob}</span>
          <span><b>Aadhar No.</b> : {aadhar}</span>
          <span><b>Phone</b> : {phone}</span>
          <span><b>Blood Group</b> : {bloodGroup}</span>
          <span><b>Address</b> : {address}</span>
          
          <div className="teacher-id">
            <b style={{ color: '#ffb806' }}>
              {isTeacher ? 'Teacher ID' : 'APAAR ID'}
            </b> : {isTeacher ? teacherId : apaarId}
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
          {principalSignURL ? (
            <img src={principalSignURL} alt="Principal Sign" className="signature" />
          ) : (
            <div className="signature" style={{ backgroundColor: '#f0f0f0', border: '1px solid #ccc' }} />
          )}
          <div className="sign-label">Principal Sign</div>
        </div>
      </div>
      
      <div className="bottom-border"></div>
    </div>
  );
};

export default IDCard;
