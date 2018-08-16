# react-netlify-form

A React component to make using Netlify & React forms easier.

## Installation

With npm:

```bash
npm install --save react-netlify-form
```

With Yarn:

```bash
yarn add react-netlify-form
```

## Usage

```jsx
<NetlifyForm>
  {formState => (
    <div>
      { formState.loading && 'Loading...' }
      { formState.error && 'Error.' }
      { formState.success && 'Success.' }
      <input type='text' name='Name' required />
      <textarea name='Message' required />
      <button>Submit</button>
    </div>
  )}
</NetlifyForm>
```

**Note:** In order for Netlify to find your forms, [they must be server-side rendered](https://www.netlify.com/docs/form-handling/) somewhere. If you use react-netlify-form on the client side accidently the form will still render but it won't work. You can work around this by adding a hidden form that renders server-side elsewhere.

## Usage with reCAPTCHA

react-netlify-form uses [react-google-recaptcha](https://github.com/dozoisch/react-google-recaptcha) under the hood, so you can pass all the same options through the `recaptcha` prop.

### reCAPTCHA v2

```jsx
<NetlifyForm recaptcha={{
  sitekey='my_recaptcha_site_key'
  size='normal'
}}>
  {({ loading, error, success, Recaptcha }) => (
    <div>
      { loading && 'Loading...' }
      { error && 'Error.' }
      { success && 'Success.' }
      { !loading && !success &&
        <div>
          <input type='text' name='Name' required />
          <textarea name='Message' required />
          <Recaptcha />
          <button>Submit</button>
        </div>
      }
    </div>
  )}
</NetlifyForm>
```

### Invisible reCAPTCHA

```jsx
<NetlifyForm recaptcha={{
  sitekey='my_recaptcha_site_key'
  size='invisible'
}}>
  {({ loading, error, success, Recaptcha }) => (
    <div>
      { loading && 'Loading...' }
      { error && 'Error.' }
      { success && 'Success.' }
      { !loading && !success &&
        <div>
          <input type='text' name='Name' required />
          <textarea name='Message' required />
          <button>Submit</button>
        </div>
      }
      {/* Invisible reCAPTCHA must be kept outside of conditionals */}
      <Recaptcha />
    </div>
  )}
</NetlifyForm>
```

## Optional properties

- `name`: The form name that will show up in your Netlify dashboard. Default: `"Form"`
- `canSubmit`: Set this to false to disable the form. Useful for things like live validation. Default: `true`
- `onSubmit`: A function that runs as soon as the form is submit.
- `onSuccess`: A function that runs as soon as the data has successfully posted to Netlify.
- `onError`: A function that runs if there are errors posting to Netlify.
- `validate`: A promise function that runs before form submission. Return `true` to prevent the form from submitting.
- `honeypotName`: The name of the honeypot field. Default: `"__bf"`
- `recatpchaError`: The error message if a reCAPTCHA is included and failes. Default: `"Please complete reCAPTCHA to submit this form."`
- `statusError`: The error message for a non 200 status on form submit. Default: `"The form data was not sent. Please try again later."`