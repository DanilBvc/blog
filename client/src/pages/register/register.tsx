import './register.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { eye, eyeoff } from '../../assets/generalIcons/checkBoxIcons';
import FormError from '../../components/general/formError/formError';
import { buttonType } from '../../components/general/submitButton/submitButton.type';
import Heading from '../../components/general/title/heading';
import { registerUrl } from '../../utils/network';
import { unauthorizedRequest } from '../../utils/queries';
import Field from '../../components/general/inputField/inputField';
import SubmitButton from '../../components/general/submitButton/submitButton';
import { registerModelType } from './register.type';

const AcceptInvitationRegister = () => {
  const { token } = useParams();

  const [registerData, setRegisterData] = useState<registerModelType>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      registerData.password.length >= 6 &&
      /[a-zA-Z]/g.test(registerData.password) &&
      /[0-9]/g.test(registerData.password)
    ) {
      const registerResponse = unauthorizedRequest(registerUrl, 'POST', {
        fullName: registerData.fullName,
        email: registerData.email,
        password: registerData.password,
      });
      registerResponse.then((responce) => {
        console.log('registerResponse: ', responce);
        if (responce === 409) {
          setError(true);
          setErrorText('This email is already use by another account.');
        } else if (registerData.password !== registerData.confirmPassword) {
          setError(true);
          setErrorText('Passwords do not match.');
        } else if (responce === 500) {
          setError(true);
          setErrorText('Something went wrong');
        } else {
          new Promise<void>((resolveOuter) => {
            setError(false);
            localStorage.setItem('token', responce.token);
            resolveOuter();
          }).then(() => {
            navigate(`/accept-invitation/confirmation/${registerData.email}/${token}`);
          });
        }
      });
    } else {
      setError(true);
      setErrorText(
        'The password has to be at least 6 characters length and has to include number and letters.'
      );
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    console.log(e.currentTarget.name);
    setRegisterData({
      ...registerData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <div className="registration">
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="registration-wrraper">
          <div className="registration-header-container">
            <div className="registration-header">
              <Heading text="Create an account" />
            </div>
            <h4 className="registration-header">
              Have an account? <Link to={`/login`}>Sign in</Link>
            </h4>
          </div>

          <FormError errorText={errorText} appear={error} />

          <div className="registration-info">
            <div className="fields-container">
              <Field
                name="fullName"
                placeholder="FullName"
                value={registerData.fullName}
                onChange={handleChange}
                type="text"
              />
              <Field
                name="email"
                placeholder="Email"
                value={registerData.email}
                onChange={handleChange}
                type="email"
              />
              <div className="field-container">
                <Field
                  name="password"
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Password"
                  minLength={6}
                  value={registerData.password}
                  onChange={handleChange}
                />
                <span
                  title={passwordVisible ? 'hide password' : 'show password'}
                  className="input-icon"
                  onClick={() => {
                    setPasswordVisible(!passwordVisible);
                  }}
                >
                  {passwordVisible ? eye : eyeoff}
                </span>
              </div>

              <Field
                name="confirmPassword"
                minLength={6}
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Repeat password"
                value={registerData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <SubmitButton type={buttonType.submit} text="Create" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AcceptInvitationRegister;