import React, { useState } from 'react';
import Preloader from '../components/Preloader';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import ShippingInfo from '../components/ShippingInfo';
import Footer from '../components/Footer';

const FAQPage = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const faqData = {
    shipping: [
      {
        question: 'What Shipping Methods Are Available?',
        answer: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim felis.'
      },
      {
        question: 'How Long Will it Take To Get My Package??',
        answer: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim felis.'
      },
      {
        question: 'What payment types can I use?',
        answer: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim felis.'
      },
      {
        question: 'Do you ship internationally??',
        answer: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim felis.'
      },
      {
        question: 'How will my parcel be delivered?',
        answer: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim felis.'
      },
      {
        question: 'How do I know if something is organic?',
        answer: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim felis.'
      }
    ],
    payment: [
      {
        question: 'What payment types can I use?',
        answer: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim felis.'
      },
      {
        question: 'Can I pay by Gift Card?',
        answer: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim felis.'
      },
      {
        question: "can't make a payment",
        answer: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim felis.'
      },
      {
        question: 'Has my payment gone through?',
        answer: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim felis.'
      },
      {
        question: 'Tracking my order',
        answer: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim felis.'
      },
      {
        question: "Haven't received my order",
        answer: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim felis.'
      }
    ],
    orders: [
      {
        question: 'How can I return an item?',
        answer: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim felis.'
      },
      {
        question: 'What Shipping Methods Are Available?',
        answer: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim felis.'
      },
      {
        question: 'How can i make refund from your website?',
        answer: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim felis.'
      },
      {
        question: 'I am a new user. How should I start?',
        answer: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim felis.'
      },
      {
        question: 'What payment methods are accepted?',
        answer: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim felis.'
      },
      {
        question: 'How do I cancel my order?',
        answer: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim felis.'
      }
    ]
  };

  const AccordionItem = ({ id, question, answer, isActive }) => (
    <div className="accordion__items">
      <h3 className="accordion__items--title">
        <button 
          className={`faq__accordion--btn accordion__items--button ${isActive ? 'active' : ''}`}
          onClick={() => toggleAccordion(id)}
          type="button"
        >
          {question}
          <svg className="accordion__items--button__icon" xmlns="http://www.w3.org/2000/svg" width="20.355" height="13.394" viewBox="0 0 512 512">
            <path d="M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z" fill="currentColor" />
          </svg>
        </button>
      </h3>
      <div className={`accordion__items--body ${isActive ? 'active' : ''}`} style={{ display: isActive ? 'block' : 'none' }}>
        <p className="accordion__items--body__desc">{answer}</p>
      </div>
    </div>
  );

  return (
    <>
      <Preloader />
      <Header />

      <main className="main__content_wrapper">
        <Breadcrumb title="Frequently Asked Questions" items={[{ label: 'FAQ' }]} />

        <section className="faq__section section--padding">
          <div className="container">
            <div className="faq__section--inner">
              <div className="face__step one border-bottom">
                <h2 className="face__step--title h3 mb-30">Shipping Information</h2>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="accordion__container">
                      {faqData.shipping.slice(0, 3).map((item, index) => (
                        <AccordionItem
                          key={`shipping-${index}`}
                          id={`shipping-${index}`}
                          question={item.question}
                          answer={item.answer}
                          isActive={activeAccordion === `shipping-${index}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="accordion__container">
                      {faqData.shipping.slice(3).map((item, index) => (
                        <AccordionItem
                          key={`shipping-${index + 3}`}
                          id={`shipping-${index + 3}`}
                          question={item.question}
                          answer={item.answer}
                          isActive={activeAccordion === `shipping-${index + 3}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="face__step one border-bottom">
                <h2 className="face__step--title h3 mb-30">Payment Information</h2>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="accordion__container">
                      {faqData.payment.slice(0, 3).map((item, index) => (
                        <AccordionItem
                          key={`payment-${index}`}
                          id={`payment-${index}`}
                          question={item.question}
                          answer={item.answer}
                          isActive={activeAccordion === `payment-${index}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="accordion__container">
                      {faqData.payment.slice(3).map((item, index) => (
                        <AccordionItem
                          key={`payment-${index + 3}`}
                          id={`payment-${index + 3}`}
                          question={item.question}
                          answer={item.answer}
                          isActive={activeAccordion === `payment-${index + 3}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="face__step one">
                <h2 className="face__step--title h3 mb-30">Orders and Returns</h2>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="accordion__container">
                      {faqData.orders.slice(0, 3).map((item, index) => (
                        <AccordionItem
                          key={`orders-${index}`}
                          id={`orders-${index}`}
                          question={item.question}
                          answer={item.answer}
                          isActive={activeAccordion === `orders-${index}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="accordion__container">
                      {faqData.orders.slice(3).map((item, index) => (
                        <AccordionItem
                          key={`orders-${index + 3}`}
                          id={`orders-${index + 3}`}
                          question={item.question}
                          answer={item.answer}
                          isActive={activeAccordion === `orders-${index + 3}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ShippingInfo />
      </main>

      <Footer />
    </>
  );
};

export default FAQPage;
