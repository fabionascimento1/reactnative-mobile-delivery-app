<Typemeny>
  <ScrollView
    style={{
      flexDirection: "row",
      padding: 20,
      paddingLeft: 12,
      paddingTop: 30,
    }}
    horizontal={true}
  >
    {this.state.menu_type.map((tmenu) => (
      <TouchableOpacity
        key={tmenu._id}
        onPress={() => this.props.navigation.push("CartScreen")}
      >
        <Image
          source={{
            uri: tmenu.image,
          }}
        />
      </TouchableOpacity>
    ))}
  </ScrollView>
</Typemeny>;
