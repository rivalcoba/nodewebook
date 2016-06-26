$(function(){
    // Make an ajax call for like btn
    $('#btn-like').on('click',function(event){
        event.preventDefault();
        var imgId = $(this).data('id');
        $.post('/images/'+imgId+'/like').done(function(data){
            $('.likes-count').text(data.likes);
        });
    });
    // Hides the form
    $('#post-comment').hide();
    $('#btn-comment').on('click',function(event){
        event.preventDefault();
        if($('#post-comment').is(':visible'))
            $('#post-comment').hide();
        else
            $('#post-comment').show();
    });
});