

//****AFFICHER LES VOITURES DANS LA LISTE DE DROITE****//

	var request = $.ajax({
	  url: "http://localhost/tp_ajax/api.php",
	  method: "GET",
	  dataType: "json"
	});

	request.done(function( data ) {

		var content = " ";
		data.forEach(function(element){ // forEach ne fonctionne que sur des array et non pas sur des objets en js ( et en php forEach fonctionne sur les array et objets)
		content += '<li id="voiture'+element.id+'"><a href="#">'+element.marque+' '+element.modele+'</a></li>';
		});

	  	//console.log(data);
	  	$("#right_column ul").html(content);

	  	$("#right_column ul > li > a").click(function(e){
			e.preventDefault();

			var idVoiture = $(this).attr("id"); // récupération de l'id
			//console.log(idVoiture.split("-"));
			idVoiture = idVoiture.split("-");

				var ficheVoiture = $.ajax({
			  		url: "http://localhost/tp_ajax/api.php",
			  		method: "GET",
			  		data: { id: idVoiture[1] }, // on obtient un tableau avec les données voiture et #id, la voiture se trouve à l'index 0 alors que le #id se trouve à l'index 1 du tableau
			  		dataType: "json"
				});

				ficheVoiture.done(function(dataVoiture) {
					console.info(dataVoiture[0].marque+" "+dataVoiture[0].modele);

					$("#id").val(dataVoiture[0].id);
					$("#marque").val(dataVoiture[0].marque);
					$("#modele").val(dataVoiture[0].modele);
					$("#annee").val(dataVoiture[0].annee);
					$("#image").val(dataVoiture[0].image);
					
					console.log($("#couleur").val());
					$("#couleur option[value="+dataVoiture[0].couleur+"]").prop("selected",true);
				});
		});
	});

	request.fail(function( jqXHR, textStatus ) {
	  alert( "Request failed: " + textStatus );
	});



//****AFFICHER LES DONNEES DU FORMULAIRE ET LE MESSAGE DE VALIDATION OU ERREUR****//

	$("form").submit(function(e) {
			e.preventDefault(); // permet de ne pas réactualiser la page et de ne pas être sur la page api.php car cette page a été demandée dans le formulaire : action

			$.ajax({
				url: "http://localhost/tp_ajax/api.php",
		  		method: "POST",
		  		data : $('form').serialize()
		  	})
			//serialize: permet de récupérer toutes les valeurs des inputs d'un formulaire. Format d'envoie = une chaîne de caractère.

		  	.done(function(dataPosts){
		  		$("#message_ajax").html("<div class='alert alert-success'><strong>Success!</strong>Car register</div>");
		  		console.log("Car register");
		  	})

		  	.fail(function( jqXHR, textStatus ) {
		  		$("#message_ajax").html("<div class='alert alert-danger'><strong>Error!</strong>Car register</div>");
		  		console.log("Car not register");
			});

	});
