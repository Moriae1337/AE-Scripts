// Ensure the project and active item are present
var mainComp = app.project.activeItem;
if (!mainComp || !(mainComp instanceof CompItem)) {
    alert("Please select an active composition!");
} else {
    var mainLayer = mainComp.layer(1);

    // Create the main UI window (palette)
    var mainWindow = new Window("palette", "Add Title and Cut", undefined);

    // Add a group for the inputs
    var groupOne = mainWindow.add("group", undefined, "groupOne");
    groupOne.orientation = "column"; // Arrange inputs vertically

    // Add static text and input fields
    groupOne.add("statictext", undefined, "This script allows you to add a title and cut your videos");
    
    // Add text fields for title and duration
    var titleName = groupOne.add("edittext", undefined, "Title of Video");
    var titleDuration = groupOne.add("edittext", undefined, "Duration of Title");
    
    // Add text fields for cut points
    var cutOne = groupOne.add("edittext", undefined, "Cut Point 1");
    var cutTwo = groupOne.add("edittext", undefined, "Cut Point 2");

    // Add a group for the buttons
    var groupTwo = mainWindow.add("group", undefined, "Buttons");
    groupTwo.orientation = "row"; // Arrange buttons horizontally

    // Add the Start and Cancel buttons
    var startButton = groupTwo.add("button", undefined, "Start");
    var cancelButton = groupTwo.add("button", undefined, "Cancel");

    // Define the Start button action
    startButton.onClick = function() {
        app.beginUndoGroup("Add Title and Cut");

        // Perform actions when the Start button is clicked
        addTitleAndCut();
    };

    // Define the Cancel button action
    cancelButton.onClick = function() {
        mainWindow.close(); // Close the UI window
    };

    // Function to add title and cut the video
    function addTitleAndCut() {
        // Parse inputs
        var titleSeconds = parseInt(titleDuration.text);
        var cutOneSeconds = parseInt(cutOne.text);
        var cutTwoSeconds = parseInt(cutTwo.text);

        // Add title text layer to the composition
        var titleText = mainComp.layers.addText(titleName.text);
        titleText.outPoint = titleSeconds; // Set the duration of the title layer

        // Duplicate layers for cuts
        var middleLayer = mainLayer.duplicate();
        var topLayer = middleLayer.duplicate();

        // Set in and out points for the layers
        mainLayer.outPoint = cutOneSeconds;
        middleLayer.inPoint = cutOneSeconds;
        middleLayer.outPoint = cutTwoSeconds;
        topLayer.inPoint = cutTwoSeconds;
        topLayer.outPoint = mainComp.duration;

        // Close the window after processing
        mainWindow.close();
        app.endUndoGroup(); // End the undo group
    }

    // Show and center the UI window
    mainWindow.show();
    mainWindow.center();
}
