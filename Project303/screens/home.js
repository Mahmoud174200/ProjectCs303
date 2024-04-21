import { View, Text ,Image} from 'react-native'
import React from 'react'

const home = () => {
  return (
    <View>
      <View >
        <View>
            <Image
                style={{ width: 25, height: 25 }}
                source={require("../assets/images/menu.png")}
            />
        </View>
        <View>
            <Image
                    style={{ width: 25, height: 25 }}
                    source={require("../assets/images/shopping.png")}
                />
            <Image
                    style={{ width: 25, height: 25 }}
                    source={require("../assets/images/search.png")}
            />
        </View>
      </View>
    </View>
  )
}

export default home