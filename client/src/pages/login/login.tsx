import { useState } from 'react';
import { meUrl, loginUrl } from '../../utils/network';
import { unauthorizedRequest, authorizedRequest } from '../../utils/queries';
import { Link, useNavigate } from 'react-router-dom';
import CheckBox from '../../components/general/checkBox/checkBox';
import Field from '../../components/general/inputField/inputField';
import SubmitButton from '../../components/general/submitButton/submitButton';
import './login.scss';
import { eye, eyeoff } from '../../assets/generalIcons/checkBoxIcons';
import { buttonType } from '../../components/general/submitButton/submitButton.type';
import FormError from '../../components/general/formError/formError';
import Heading from '../../components/general/title/heading';
import { whoAmIResponseType } from '../../generallType/generallType';
import { useAppDispatch } from '../../store/hooks/redux';
import setUserData from '../../store/actions/setUserData';

const Login = () => {
  const [error, setError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSumit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const responce = await unauthorizedRequest(loginUrl, 'POST', { email, password });
      if (responce.token) {
        setError(false);
        localStorage.setItem('token', responce.token);
        const user: whoAmIResponseType = await authorizedRequest(meUrl, 'GET');
        if (user) {
          if (user.avatarUrl) {
            localStorage.setItem('avatar', user.avatarUrl);
          }
          dispatch(setUserData(user));
        }
        navigate('/');
      }
    } catch (err) {
      setError(true);
      setErrorText(String(err));
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-header">
          <Heading text="Sign In" />
          <div className="login-text">
            <p>Don’t have an account yet?</p>
            <Link to="/register">
              <p>Register</p>
            </Link>
          </div>
        </div>
        <FormError errorText={errorText} appear={error} />
        <form onSubmit={onSumit} className="login-form">
          <div className="form-controls">
            <Field
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
              name="email"
            />
            <div className="password-control">
              <Field
                type={isVisible ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                name="password"
              />
              <span
                title={isVisible ? 'hide password' : 'show password'}
                className="input-icon"
                onClick={() => {
                  setIsVisible(!isVisible);
                }}
              >
                {isVisible ? eye : eyeoff}
              </span>
            </div>
          </div>
          <div className="login-options">
            <CheckBox isChecked={isChecked} setIsChecked={setIsChecked} label="Remember me" />
            <Link to="/forget" className="login-forget">
              Forget password?
            </Link>
          </div>
          <SubmitButton type={buttonType.submit} text="Sign In" />
        </form>
      </div>
    </div>
  );
};

export default Login;
