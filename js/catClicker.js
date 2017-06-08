//MODEL
var model = {
    currentCat: null,
    adminVisible: false,
    //Create an array to hold objects for each cat
    catListing: [
    {source:'img/suit-cat.jpg',txt:'Cat in a Suit', counter: 0},
    {source:'img/cat-and-tree.jpg',txt:'Cat by a Tree', counter: 0},
    {source:'img/dragon-kitty.jpg',txt:'Firebreathing Cat', counter: 0},
    {source:'img/kitty-burrito.jpg',txt:'Cat Rolled in a Rug', counter: 0},
    {source:'img/rambo-cats.jpg',txt:'Cats with a Gun', counter: 0}
    ]
};

//OCTOPUS
var octopus = {
    init: function() {
        model.currentCat = model.catListing[0];

        view.loadCatList();
        //Add event listeners to submit button and pic
        $('#catSubmit').click(view.selectCat);
        $('#cat-pic').click(this.updateCount);
        $('#catAdmin').click(view.renderAdmin);
        $('#cancelAdmin').click(view.cancelAdmin);
        $('#catSave').click(view.saveAdmin);
    },
    getCurrentCat: function() {
        return model.currentCat;
    },
    getCatList: function() {
        return model.catListing;
    },
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },
    getAdminState: function() {
        return model.adminVisible;
    },
    setAdminState: function(state) {
        model.adminVisible = state;
    },
    pushCat: function(cat) {
    	model.catListing.push(cat);
    	this.setCurrentCat(cat);
    	view.renderCat(cat);
    },
    updateCount: function(e) {
        model.currentCat.counter++;
        $("#count1").val(' ' + model.currentCat.counter);
    }
};

//VIEWS
var view = {
    //Populate the select node with available cat options
    loadCatList: function() {
        var cats = octopus.getCatList();
        for(var i = 0; cats.length > i; i++) {
            $('#catPick').append('<option>' + cats[i].txt);
        };
        //Initialize the image window with the first object in array
        this.renderCat(cats[0]);
    },
    //Switch the cat image and header value based on user selection
    selectCat: function() {
        var cats = octopus.getCatList();
        for(var i = 0; cats.length > i; i++) {
            if($('#catPick').val() === cats[i].txt) {
                //When a match is found populate variable that identifies currently selected cat and
                octopus.setCurrentCat(cats[i]);
                //Exit the loop
                break;
            };
        };

        //If the user had the admin area open, close it
        if(octopus.getAdminState() === true) {
            octopus.setAdminState(false);
            $('.form-group').css('visibility','hidden');
        };

        //RESEARCH WHY 'THIS' KEYWORD DOES NOT WORK HERE
        view.renderCat(octopus.getCurrentCat());
    },
    renderCat: function(cat) {
        $('#cat-pic').attr('src', cat.source).attr('alt', cat.txt);
        $("#count1").val(' ' + cat.counter);
        $('.catHdr').text(cat.txt);
    },
    renderAdmin: function() {
        //Check to see if admin area is already shown
        if(octopus.getAdminState() === false) {
            //If not flip state to true and dom node to visible
            octopus.setAdminState(true);
            $('.form-group').css('visibility','visible');

            //Get current values for the fields and display in input
            var cat = octopus.getCurrentCat();
            $('#adminName').val(cat.txt);
            $('#adminURL').val(cat.source);
            $('#adminClicks').val(cat.counter);
        }
    },
    cancelAdmin: function() {
        octopus.setAdminState(false);
        $('.form-group').css('visibility','hidden');
    },
    saveAdmin: function() {
        //Capture values entered in the admin area
        var saveName = $('#adminName').val();
        var saveUrl = $('#adminURL').val();
        var saveCount = $('#adminClicks').val();

        //Build object to insert into catListing array
        var newCat = {'source':saveUrl, 'txt':saveName, 'counter':Number(saveCount)};
        //TESTING

        octopus.pushCat(newCat);
    }
};

octopus.init();
//console.log(JSON.stringify(model.catListing));