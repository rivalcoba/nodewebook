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
    // Delete image function
    $('#btn-delete').on('click', function(event){
        event.preventDefault();
        var $this = $(this);
        var remove = confirm('Esta seguro de que desea eliminar esta imágen?');
        if(remove){
            var imgId = $(this).data('id');
            // Making the ajax call
            $.ajax({
                url: "/images/"+imgId,
                type: 'DELETE'
            }).done(function(result){
                if(result){
                    $this.removeClass('btn-danger').addClass('btn-success');
                    $this.find('i').removeClass('fa fa-times').addClass('fa fa-check');
                    $this.append('<span> Borrada!</span>');
                }
            });
        }
    });
});