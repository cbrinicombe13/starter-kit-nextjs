import React, { useState } from 'react';
import Router from 'next/router';
import { signin, authenticate, isAuth } from '../../actions/auth';

const SignInComponent = () => {
    const [values, setValues] = useState({
        form: {
            email: '',
            password: ''
        },
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({
            ...values,
            loading: true,
            error: false
        });
        signin(values.form)
        .then(data => {
            if(data.error) {
                setValues({
                    ...values,
                    error: data.error,
                    loading: false
                });
            } else {
                authenticate(data, () => {
                    if(isAuth() && isAuth().role === 1) {
                        Router.push(`/admin`);
                    } else {
                        Router.push(`/user`);
                    }
                })
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

    const { email, password } = values.form;
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

    const signInForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
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
                    <button className="btn btn-primary">Sign In</button>
                </div>
            </form>
        )
    }


    return (
        <React.Fragment>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signInForm()}
        </React.Fragment>
    );
}

export default SignInComponent;