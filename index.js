$( document ).ready(function() {
    console.log('ready');
  });

$( function() {
    $( ".draggable" ).draggable();
} );

$( ".droppable" ).droppable({
    accept: ".draggable",
    classes: {
      "ui-droppable-active": "ui-state-active",
      "ui-droppable-hover": "ui-state-hover"
    },
    drop: function( event, ui ) {
        console.log('dropped')
      $( this )
        .addClass( "ui-state-highlight" )
        .find( "p" )
          .html( "Dropped!" );
    }
  });