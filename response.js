module.exports = {
    render: (addresses) => {
        response = "<html><head></head><body><h1> Following are the titles of given websites: </h1><ul>";
        addresses.forEach(elem => {
            response = response + "<li>" + elem.url + " - " + elem.title + "</li>";
        });
        response = response + "</ul></body></html>";
        return response;
    }
}