import App from '../components/App'
import Submit from '../components/Submit'
import Tracker from '../components/Tracker'
import withData from '../lib/withData'

export default withData((props) => (
  <App>
    <h1 className="f1"><span className="lh-solid" style={{fontSize: '2em'}}>🍕</span> Your pizza is ready</h1>
    <Tracker />
  </App>
))
