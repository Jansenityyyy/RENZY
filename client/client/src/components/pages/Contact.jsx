import { useState } from 'react';
import '../styles/Contact.css';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', form);
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact">
      <h2>Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} required />
        <textarea name="message" placeholder="Message" rows="5" value={form.message} onChange={handleChange} required />
        <button type="submit">Send</button>
      </form>
      {sent && <p className="contact-success">Message sent! Thank you.</p>}
    </div>
  );
}

export default Contact;