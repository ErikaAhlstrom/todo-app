import React from 'react';

export default function LoginForm({handleOnSubmit, handleOnChange}) {
  return (
    <form onSubmit={handleOnSubmit} onChange={handleOnChange} action="">
      <div className="login-card">
        <input
          className="login-input input"
          name="email"
          placeholder="Email"
          type="email"
        />
        <input
          className="login-input input"
          name="password"
          placeholder="Password"
          type="password"
        />
      </div>
      <button
        className="btn btn-primary btn-login"
        type="submit"
      >Login</button>
    </form>
  );
}
