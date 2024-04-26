import React from 'react';
export default function Contact() {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>CONTACT US</h2>
      <p style={styles.paragraph}>
        Have a question or need assistance? Don't hesitate to reach out to us!
        <br />
        You can contact us at:
        <br />
        Phone: <a href="tel:+918500782888">8500782888</a>
        <br />
        Email: <a href="mailto:mikemarcus1201@gmail.com">mikemarcus1201@gmail.com</a>
      </p>
    </div>
  );
}


const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '##FFF47D', 
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  paragraph: {
    fontSize: '18px',
    lineHeight: '1.6',
  },
};
