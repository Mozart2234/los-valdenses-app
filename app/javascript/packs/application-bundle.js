import ReactOnRails from 'react-on-rails';

import FormScore from '../bundles/Application/components/FormScore';
import ScoreList from '../bundles/Application/components/ScoreList';
import axios from 'axios';


ReactOnRails.register({
  FormScore,
  ScoreList
});

axios.defaults.headers.common['X-CSRF-TOKEN'] = ReactOnRails.authenticityToken()
