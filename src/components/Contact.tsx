import { FormEvent, useState } from 'react';
import { send } from '@emailjs/browser';

import { motion } from 'framer-motion';

import {
  staggerContainer,
  fadeIn,
  planetVariants,
  zoomIn
} from '../utils/motion';
import { Input, Label, TitleText, TypingText } from '../components';

import { images } from '../constants';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const serviceId = import.meta.env.VITE_SERVICE_ID;
  const templateId = import.meta.env.VITE_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_USER_ID;

  const handleSubmit = (event: FormEvent) => {
    event?.preventDefault();

    setLoading(true);

    if (!name || !email || !message) {
      return;
    }

    send(
      serviceId,
      templateId,
      {
        name,
        email,
        message
      },
      publicKey
    ).then(() => {
      setLoading(false);
      setIsFormSubmitted(true);
    });
  };

  return (
    <section className="sm:p-16 xs:p-8 px-6 py-12 relative z-10">
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="2xl:max-w-[1280px] w-full mx-auto flex lg:flex-row flex-col gap-8"
      >
        <motion.div
          variants={fadeIn('right', 'tween', 0.2, 1)}
          className="flex-[0.75] flex justify-center flex-col"
        >
          <TypingText title="| Contact" />
          <TitleText title={<>Contact Us!</>} />

          {!isFormSubmitted ? (
            <motion.form
              variants={zoomIn(0.4, 1)}
              onSubmit={handleSubmit}
              className="mt-12"
            >
              <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col items-start justify-start">
                  <Label id="name" content="Name" />
                  <Input
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    name="name"
                    required
                  />
                </div>

                <div className="flex flex-col items-start justify-start">
                  <Label id="email" content="Email" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    name="email"
                    required
                  />
                </div>

                <div className="flex flex-col items-start justify-start">
                  <Label id="message" content="Message" />
                  <textarea
                    className="border border-secondary-blue sm:text-sm rounded-lg block w-full p-2.5 bg-black text-primary-white placeholder-primary-white focus:ring-secondary-blue focus:ring-2 focus:outline-none resize-none"
                    placeholder="Your Message"
                    id="message"
                    value={message}
                    name="message"
                    onChange={e => setMessage(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-primary-white bg-secondary-blue hover:bg-primary-blue focus:ring-2 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-secondary-blue transition"
                >
                  {loading ? 'Sending' : 'Send Message'}
                </button>
              </div>
            </motion.form>
          ) : (
            <div className="text-[2.75rem] font-extrabold text-center text-primary-white capitalize sm:text-[2rem]">
              <h3>Thank you for getting in touch!</h3>
            </div>
          )}
        </motion.div>

        <motion.div
          variants={planetVariants('right')}
          className="flex-1 flex justify-center items-center"
        >
          <img
            src={images.contact}
            alt="whats-new"
            className="w-[90%] h-[90%] object-contain"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
