import App from '../components/App'
import Submit from '../components/Submit'
import OrderList from '../components/OrderList'
import withData from '../lib/withData'

export default withData((props) => (
  <App>
    <Submit />
    <OrderList />
  </App>
))
