class Resource {
    

    item(data){
        
        if(!Array.isArray(data.toJSON())){
            return this.toArray(data)
        }
    }

    collection(data){
        let items = []
        data?.map((item) => items.push(this.toArray(item)) )

        return items;
    }
    

}

module.exports = Resource
