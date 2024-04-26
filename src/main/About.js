import React from 'react';
import config from '../config'

export default function About() {
  return (
    <div style={styles.container}>
      <h4 style={styles.heading}>OUR VISION</h4>
      <p style={styles.paragraph}>
        Say no to objectifying of Animals..Its not Buying the Pets Its only Adoption Of Animals There are no breeds in the animals the only breed they have is LOVE. Heartstrings Tied, Paws Forever by Your Side...
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
