import { useContext, useRef, useState } from 'react';
import classes from './newsletter-registration.module.css';
import NotificationContext from 'store/notification-context';

function NewsletterRegistration() {
    const emailInputRef = useRef();
    const [isInvalid, setIsInvalid] = useState(false);
    const notificationCtx = useContext(NotificationContext);

    function registrationHandler(event) {
        event.preventDefault();
        // fetch user input (state or refs)
        const enteredEmail = emailInputRef.current.value;

        notificationCtx.showNotification({
            title: 'Signing up...',
            message: 'Registering for newsletter.',
            status: 'pending',
        });

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
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return response.json().then((data) => {
                    throw new Error(data.message || 'Something went wrong');
                });
            })
            .then((data) => {
                notificationCtx.showNotification({
                    title: 'Success!',
                    message: 'Successfully registered for newsletter!',
                    status: 'success',
                });
            })
            .catch((error) => {
                notificationCtx.showNotification({
                    title: 'Error!',
                    message: error.message || 'Something went wrong!',
                    status: 'error',
                });
            });
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
