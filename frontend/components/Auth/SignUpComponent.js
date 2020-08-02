import React, { useState, useEffect } from 'react';
import { signup, isAuth } from '../../actions/auth';
import Router from 'next/router';

const SignUpComponent = () => {
    const [values, setValues] = useState({
        form: {
            name: '',
            email: '',
            password: ''
        },
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    useEffect(() => {
        isAuth() && Router.push('/');
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({
            ...values,
            loading: true,
            error: false
        });
        signup(values.form)
        .then(data => {
            if(data.error) {
                setValues({
                    ...values,
                    error: data.error,
                    loading: false
                });
            } else {
                setValues({
                    ...values,
                    form: {
                        name: '',
                        email: '',
                        password: ''
                    },
                    error: '',
                    loading: false,
                    message: data.message,
                    showForm: false
                });
            }
        })
    }

    const handleChange = (e) => {
        setValues({
            ...values,
            error: false,
            form: {
                ...values.form,
                [e.target.name]: e.target.value
            }
        });
    }

    const { name, email, password } = values.form;
    const { error, loading, message, showForm } = values;

    const showLoading = () => (
        loading ? <div className="alert alert-info">Loading...</div> : ''
    )

    const showError = () => (
        error ? <div className="alert alert-warning">{error}</div> : ''
    )

    const showMessage = () => (
        message ? <div className="alert alert-success">{message}</div> : ''
    )

    const signUpForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control mt-3 mb-3"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={handleChange} />
                    <input
                        type="email"
                        className="form-control mt-3 mb-3"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={handleChange} />
                    <input
                        type="password"
                        className="form-control mt-3 mb-3"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={handleChange} />
                </div>
                <div>
                    <button className="btn btn-primary">Sign Up</button>
                </div>
            </form>
        )
    }


    return (
        <React.Fragment>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signUpForm()}
        </React.Fragment>
    );
}

export default SignUpComponent;