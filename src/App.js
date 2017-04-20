import React, { Component } from 'react'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import {SubscriptionClient, addGraphQLSubscriptions} from 'subscriptions-transport-ws'
import Route from './Route'


// Create WebSocket client
const wsClient = new SubscriptionClient(`wss://subscriptions.graph.cool/v1/cj1panepofc1x0170pyi36q4e`, {
  reconnect: true,
})

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj1panepofc1x0170pyi36q4e'
})

// Extend the network interface with the WebSocket
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  dataIdFromObject: o => o.id,
})


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Route/>
      </ApolloProvider>
    )
  }
}

export default App
