import ReactOnRails from 'react-on-rails';

import FormScore from '../bundles/Application/components/FormScore';
import ScoreList from '../bundles/Application/components/ScoreList';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  FormScore,
  ScoreList
});
