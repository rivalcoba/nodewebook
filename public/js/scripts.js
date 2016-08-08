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
        swal({
            title: "¿Estas seguro?",
            text: "Esta operación es irreversible.",
            type:"warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "¡Si, Borralo!",
            cancelButtonText: "¡No, cancela la operación!",
            closeOnConfirm: false,
            closeOnCancel: false
        },function(remove){
            if(remove){
                var imgId = $this.data('id');
                console.log("> imgId " + imgId);
                //Making the ajax call
                $.ajax({
                    url: "/images/"+imgId,
                    type: 'DELETE'
                }).done(function(result){
                    if(result){
                        swal("¡Borrada!", "La imagen ha sido borrada", "success");
                        $this.removeClass('btn-danger').addClass('btn-success');
                        $this.find('i').removeClass('fa fa-times').addClass('fa fa-check');
                        $this.append('<span> Borrada!</span>');
                    }
                });
            }else{
                swal("Cancelado", "Se ha cancelado el borrado de la imágen", "error");
            }
        });
    });
});