import React, {Component, Fragment } from 'react';
import{
  getFromStorage,
  setInStorage
} from './storage';

class loginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
    isLoading: true,
    token:'',
    signUpError:'',
    signInError:'',
    signInEmail:'',
    signInPassword:'',
    signUpFirstName:'',
    signUpLastName:'',
    signUpEmail:'',
    signUpPassword:''

    };
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);
}
    componentDidMount() {
	const token = getFromStorage('the_main_app');
	if(token){
	    //verify token
	    fetch('/api/account/verify?token=' +token)
		.then(res => res.json())
		.then(json => {
		    if(json.success){
			this.setState({
			    token,
			    isLoading:false
			});

		    } else{
			this.setState({
			    isLoading: false,
			});
		    }
		});
	}else{
	    this.setState({
		isLoading: false,
	    });
	}
    }

    onTextboxChangeSignInEmail(event){
	this.setState({
	    signInEmail: event.target.value,
	});
    }
    onTextboxChangeSignInPassword(event){
	this.setState({
	    signInPassword: event.target.value,
	});
    }
    onTextboxChangeSignUpEmail(event){
	this.setState({
	    signUpEmail: event.target.value,
	});
    }
    onTextboxChangeSignUpPassword(event){
	this.setState({
	    signUpPassword: event.target.value,
	});
    }
    onTextboxChangeSignUpFirstName(event){
	this.setState({
	    signUpFirstName: event.target.value,
	});
    }
    onTextboxChangeSignUpLastName(event){
	this.setState({
	    signUpLastName: event.target.value,
	});
    }  
    
    render() {
	const{
	    isLoading,
	    token,
	    signInError,
	    signInEmail,
	    signInPassword,
	    signUpFirstName,
	    signUpLastName,
	    signUpEmail,
	    signUpPassword
	}=this.state;
	if(isLoading){
	    return(<div><p>Loading...</p></div>);
	}
	if(!token){
	    return(
		    <div>
		    <div>
		    {
			(signInError) ? (
				<p>{signInError}</p>
			): (null)
		    }
		    <p>Sign In</p>
		    <input
		type ="email"
		placeholder="Email"
		value={signInEmail}
		onChange={this.onTextboxChangeSignInEmail}/><br />
		    <input
		type ="password"
		placeholder="Password"
		value={signInPassword}
		onChange={this.onTextboxChangeSignInPassword}/><br />
		    <button>Sign In</button>
		    </div>
		    <br />
		    <br />
		    <div>

		    <p>Sign up</p>
		    <input type ="text"
		placeholder="First Name"
		value={signUpFirstName}
		onChange={this.onTextboxChangeSignUpFirstName}/><br />
		    <input
		type ="text"
		placeholder="Last Name"
		value={signUpLastName}
		onChange={this.onTextboxChangeSignUpLastName}/><br />
		    <input
		type ="email"
		placeholder="Email"
		value={signUpEmail}
		onChange={this.onTextboxChangeSignUpEmail}/><br />
		    <input
		type ="password"
		placeholder="Password"
		value={signUpPassword}
		onChange={this.onTextboxChangeSignUpPassword}/><br />
		    <button>Sign Up</button>
		    </div>
		    </div>
	    );
	}

	return(
		<div>
		<p>Account</p>
		</div>
	);
    }
}



export default loginPage; 
