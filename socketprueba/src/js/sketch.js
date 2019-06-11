var socket;
var text = {
    text: '45'
};
socket = io.connect('http://186.90.73.232:3000');
function setup(){
    $("#text").on("froalaEditor.keyup", function(){
        var html = $(this).froalaEditor('html.get');
        var data = {
            text:html
        };
        socket.emit('text', data);
    });
    $('#text').froalaEditor({
        toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', '|', 'fontFamily', 'fontSize', 'color', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'selectAll', 'clearFormatting', '|', 'undo', 'redo'],
        fullPage: true
    });

    socket.on('text', handleRecievedText);
    socket.on('newUser', updateText);
    socket.on('initialize', updateText);
}

function updateText(data){
    text.text = data.text;
    $("#text").froalaEditor('html.set', data.text);
    var editor = $('#text').data('froala.editor');
    editor.selection.setAtEnd(editor.$el.get(0));
    editor.selection.restore();
}

function handleRecievedText(data){
    console.log(data);
    text.text = data.text;
    $("#text").froalaEditor('html.set', data.text);
    var editor = $('#text').data('froala.editor');
    editor.selection.setAtEnd(editor.$el.get(0));
    editor.selection.restore();
}

$('#text').froalaEditor('html.set', 'My custom paragraph.');




