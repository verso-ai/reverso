//import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReversoForm, ReversoPage, ReversoElement } from '@reverso/react';
import '../dist/styles.css';

const App = () => {
  return (
    <div style={{ padding: '30px' }}>
      <ReversoForm domain="app.reverso.com" protocol="http" formId="abcd">
        <ReversoPage name="basicInfo">
          <ReversoElement type="text" name="name" label="Your name" required />
          <ReversoElement
            type="textarea"
            name="about"
            label="About you"
            required
          />
          <ReversoElement name="submit" type="submit" label="Submit" />
        </ReversoPage>
        <ReversoPage name="advancedInfo">
          <ReversoElement
            type="checkbox"
            name="programming-lanuguages"
            label="What programming languages do you love?"
            options={['C++', 'Javascript', 'Scala', 'Assembler']}
          />
          <ReversoElement
            type="radio"
            name="favourite-food"
            label="What's your favorite food?"
            options={['Pizza', 'Pasta', 'Sushi']}
          />
          <ReversoElement name="submit" type="submit" label="Submit" />
        </ReversoPage>
        <ReversoPage name="thankyou" thankyou>
          <p>Thanks a lot for your time and insights 🙏</p>
        </ReversoPage>
      </ReversoForm>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
