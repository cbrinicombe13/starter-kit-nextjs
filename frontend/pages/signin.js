import Layout from '../components/Layout/Layout';

import SignInComponent from '../components/Auth/SignInComponent';

const Signin = () => {
    return (
        <Layout>
            <h2 className="text-center pt-4 pb-4">Sign In</h2>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <SignInComponent />
                </div>
            </div>
        </Layout>
    )
}

export default Signin;