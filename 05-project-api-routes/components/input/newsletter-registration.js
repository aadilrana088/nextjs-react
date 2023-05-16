import { useRef, useState } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
    const emailInputRef = useRef();
    const [isInvalid, setIsInvalid] = useState(false);
    function registrationHandler(event) {
        event.preventDefault();
        // fetch user input (state or refs)
        const enteredEmail = emailInputRef.current.value;
        // optional: validate input
        if (
            !enteredEmail ||
            enteredEmail.trim() === '' ||
            !enteredEmail.includes('@')
        ) {
            setIsInvalid(true);
        }
        // send valid data to API
        fetch('/api/newsletter/', {
            method: 'POST',
            body: JSON.stringify({ email: enteredEmail }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    }

    return (
        <section className={classes.newsletter}>
            <h2>Sign up to stay updated!</h2>
            <form onSubmit={registrationHandler}>
                <div className={classes.control}>
                    <input
                        type="email"
                        id="email"
                        placeholder="Your email"
                        aria-label="Your email"
                        ref={emailInputRef}
                    />
                    <button>Register</button>
                </div>
                {isInvalid && (
                    <p style={{ color: 'red' }}>
                        Please enter proper email address
                    </p>
                )}
            </form>
        </section>
    );
}

export default NewsletterRegistration;
