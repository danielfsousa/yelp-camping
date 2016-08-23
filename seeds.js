var mongoose = require('mongoose');
var Comentario = require('./models/comentario');
var Area = require('./models/area-de-camping');

var data = [
    {nome: 'Lugar1', imagem: 'https://media.gadventures.com/media-server/cache/c3/5b/c35bca62c1f4db8c162f6fcd50c45001.jpg', autor:{usuario: 'Homer'}, descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et ipsum ut massa eleifend sagittis eget vel sem. Aliquam cursus dui aliquet, placerat metus at, ornare lacus. In euismod elit a dui ultrices, cursus commodo mi viverra. Maecenas bibendum tortor in lectus condimentum mollis. Ut venenatis tortor ut feugiat pharetra. Integer sed felis et lorem pellentesque rhoncus. Morbi et dapibus dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer luctus consectetur elit, eget sollicitudin massa luctus eget. Duis ac justo tellus. Nunc eget mattis metus. Donec sagittis tristique nibh faucibus aliquet. Donec dignissim quis orci et sodales. Nunc id est aliquet elit euismod elementum sed a felis. Maecenas vel nisi ut turpis luctus sollicitudin. Nam imperdiet ex eros, id lobortis purus placerat vitae. Mauris lacinia erat vestibulum neque laoreet, in ultrices tellus facilisis. Suspendisse nec tincidunt risus, at auctor ligula. Aenean efficitur auctor congue. Maecenas eu varius dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut est neque, sollicitudin sit amet interdum sit amet, dictum vel libero.'},
    {nome: 'Lugar2', imagem: 'https://www.zent.com/wp-content/uploads/2016/06/fd.jpg', autor:{usuario: 'Homer'}, descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et ipsum ut massa eleifend sagittis eget vel sem. Aliquam cursus dui aliquet, placerat metus at, ornare lacus. In euismod elit a dui ultrices, cursus commodo mi viverra. Maecenas bibendum tortor in lectus condimentum mollis. Ut venenatis tortor ut feugiat pharetra. Integer sed felis et lorem pellentesque rhoncus. Morbi et dapibus dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer luctus consectetur elit, eget sollicitudin massa luctus eget. Duis ac justo tellus. Nunc eget mattis metus. Donec sagittis tristique nibh faucibus aliquet. Donec dignissim quis orci et sodales. Nunc id est aliquet elit euismod elementum sed a felis. Maecenas vel nisi ut turpis luctus sollicitudin. Nam imperdiet ex eros, id lobortis purus placerat vitae. Mauris lacinia erat vestibulum neque laoreet, in ultrices tellus facilisis. Suspendisse nec tincidunt risus, at auctor ligula. Aenean efficitur auctor congue. Maecenas eu varius dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut est neque, sollicitudin sit amet interdum sit amet, dictum vel libero.'},
    {nome: 'Lugar3', imagem: 'http://tendencee.com.br/wp-content/uploads/2015/10/12-incriveis-locais-para-se-acampar-pelo-mundo-13.jpg', autor:{usuario: 'Homer'}, descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et ipsum ut massa eleifend sagittis eget vel sem. Aliquam cursus dui aliquet, placerat metus at, ornare lacus. In euismod elit a dui ultrices, cursus commodo mi viverra. Maecenas bibendum tortor in lectus condimentum mollis. Ut venenatis tortor ut feugiat pharetra. Integer sed felis et lorem pellentesque rhoncus. Morbi et dapibus dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer luctus consectetur elit, eget sollicitudin massa luctus eget. Duis ac justo tellus. Nunc eget mattis metus. Donec sagittis tristique nibh faucibus aliquet. Donec dignissim quis orci et sodales. Nunc id est aliquet elit euismod elementum sed a felis. Maecenas vel nisi ut turpis luctus sollicitudin. Nam imperdiet ex eros, id lobortis purus placerat vitae. Mauris lacinia erat vestibulum neque laoreet, in ultrices tellus facilisis. Suspendisse nec tincidunt risus, at auctor ligula. Aenean efficitur auctor congue. Maecenas eu varius dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut est neque, sollicitudin sit amet interdum sit amet, dictum vel libero.'},
    {nome: 'Lugar4', imagem: 'https://i.ytimg.com/vi/vfkhlLnSq7o/maxresdefault.jpg', autor:{usuario: 'Homer'}, descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et ipsum ut massa eleifend sagittis eget vel sem. Aliquam cursus dui aliquet, placerat metus at, ornare lacus. In euismod elit a dui ultrices, cursus commodo mi viverra. Maecenas bibendum tortor in lectus condimentum mollis. Ut venenatis tortor ut feugiat pharetra. Integer sed felis et lorem pellentesque rhoncus. Morbi et dapibus dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer luctus consectetur elit, eget sollicitudin massa luctus eget. Duis ac justo tellus. Nunc eget mattis metus. Donec sagittis tristique nibh faucibus aliquet. Donec dignissim quis orci et sodales. Nunc id est aliquet elit euismod elementum sed a felis. Maecenas vel nisi ut turpis luctus sollicitudin. Nam imperdiet ex eros, id lobortis purus placerat vitae. Mauris lacinia erat vestibulum neque laoreet, in ultrices tellus facilisis. Suspendisse nec tincidunt risus, at auctor ligula. Aenean efficitur auctor congue. Maecenas eu varius dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut est neque, sollicitudin sit amet interdum sit amet, dictum vel libero.'},
    {nome: 'Lugar5', imagem: 'http://battenkillriversports.com/wp-content/uploads/2016/02/18f63e24-1637-4897-a973-b0b80f6bbc24.jpg', autor:{usuario: 'Homer'}, descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et ipsum ut massa eleifend sagittis eget vel sem. Aliquam cursus dui aliquet, placerat metus at, ornare lacus. In euismod elit a dui ultrices, cursus commodo mi viverra. Maecenas bibendum tortor in lectus condimentum mollis. Ut venenatis tortor ut feugiat pharetra. Integer sed felis et lorem pellentesque rhoncus. Morbi et dapibus dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer luctus consectetur elit, eget sollicitudin massa luctus eget. Duis ac justo tellus. Nunc eget mattis metus. Donec sagittis tristique nibh faucibus aliquet. Donec dignissim quis orci et sodales. Nunc id est aliquet elit euismod elementum sed a felis. Maecenas vel nisi ut turpis luctus sollicitudin. Nam imperdiet ex eros, id lobortis purus placerat vitae. Mauris lacinia erat vestibulum neque laoreet, in ultrices tellus facilisis. Suspendisse nec tincidunt risus, at auctor ligula. Aenean efficitur auctor congue. Maecenas eu varius dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut est neque, sollicitudin sit amet interdum sit amet, dictum vel libero.'}
];

function seedDB() {
    Area.remove({}, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log('removed areas!');
        }

        data.forEach(function(area) {
            Area.create(area, function (err, novaArea) {
                 if(err) {
                     console.log(err);
                 } else {
                     console.log('area adicionada');
                     Comentario.create({
                         autor: {
                             usuario: 'Homer'
                         },
                         texto: 'Foda pra caraio'
                     }, function(err, comentario) {
                         if(err) {
                             console.log(err);
                         } else {
                             novaArea.comentarios.push(comentario);
                             novaArea.save();
                             console.log('comentario criado');
                         }

                     });
                 }
            });
        });
    });

}

module.exports = seedDB;
