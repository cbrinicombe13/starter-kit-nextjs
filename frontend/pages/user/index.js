import Layout from '../../components/Layout/Layout';
import Private from '../../components/Auth/Private';

const UserIndex = () => {
    return (
        <Layout>
            <Private>
                <h2>User Dashboard</h2>
            </Private>
        </Layout>
    )
}

export default UserIndex;