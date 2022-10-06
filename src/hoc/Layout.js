import React from 'react';
import { connect } from 'react-redux';
import Toolbar from '../Components/Navigation/Toolbar'
import Auxiliary from './Auxiliary';
import Footer from '../Components/Footer';

class Layout extends React.Component {
    render(){
        console.log('[layout]', this.props.isAuthenticated);
        return (
            <Auxiliary>
                <div>
                    <Toolbar isAuth={this.props.isAuthenticated}/>
                    {this.props.children}
                    <Footer />
                </div>
            </Auxiliary>
        );
    }
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Layout);