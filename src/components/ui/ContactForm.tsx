import { useState } from 'react';
import { FaPaperPlane, FaCheck } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';

const ContactForm = () => {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    intent: 'buy' // Default intent
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission with a delay
    setTimeout(() => {
      // Form submission logic would go here
      console.log('Form submitted:', formData);
      
      // Reset form and show success state
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          intent: 'buy'
        });
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">{t('contactTitle')}</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-8"></div>
          
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            {t('contactSubtitle')}
          </p>
          
          <form 
            onSubmit={handleSubmit} 
            className="bg-secondary p-8 md:p-10 rounded-lg shadow-card transition-all duration-300"
          >
            {!isSubmitted ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label htmlFor="name" className="form-label">
                      {t('contactFullName')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="form-label">
                      {t('contactEmail')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="form-label">
                      {t('contactPhone')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="intent" className="form-label">
                      {t('contactLookingTo')} <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="intent"
                      name="intent"
                      value={formData.intent}
                      onChange={handleChange}
                      required
                      className="form-input appearance-none bg-white"
                      disabled={isSubmitting}
                    >
                      <option value="buy">{t('contactIntentBuy')}</option>
                      <option value="rent">{t('contactIntentRent')}</option>
                      <option value="other">{t('contactIntentOther')}</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-8">
                  <label htmlFor="message" className="form-label">
                    {t('contactMessage')} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="form-input resize-none"
                    disabled={isSubmitting}
                  ></textarea>
                </div>
                
                <div className="text-center">
                  <button
                    type="submit"
                    className={`btn btn-primary flex items-center justify-center mx-auto px-8 py-3 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg'
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('contactSending')}
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" />
                        {t('contactSend')}
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="py-8 text-center">
                <div className="bg-green-100 text-green-700 p-4 rounded-full inline-flex items-center justify-center mb-6">
                  <FaCheck size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('contactSuccessTitle')}</h3>
                <p className="text-gray-600 mb-0">
                  {t('contactSuccessMsg')}
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
