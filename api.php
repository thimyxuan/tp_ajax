<?php

// ------------------------- Connexion à la bdd ----------------------------
try
{
	$dbh = new PDO('mysql:host=localhost;dbname=MikeMonRoi','root','');
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
}
catch(PDOException $e)
{
	echo 'Connexion impossible. Message error:' . $e;
}

// --------------- Vérification des données formulaire -------------------

if($_SERVER['REQUEST_METHOD']=='POST') 
{
	if(!empty($_POST))
	{
		$stmt = $dbh->prepare("INSERT INTO voiture(marque, modele, annee, couleur, image)VALUES(:marque, :modele, :annee, :couleur, :image )");
		$stmt->bindParam(':marque', $_POST['marque'], PDO::PARAM_STR);
		$stmt->bindParam(':modele', $_POST['modele'], PDO::PARAM_STR);
		$stmt->bindParam(':annee', $_POST['annee'], PDO::PARAM_STR);
		$stmt->bindParam(':couleur', $_POST['couleur'], PDO::PARAM_STR);
		$stmt->bindParam(':image', $_POST['image'], PDO::PARAM_STR);
	}
	$stmt->execute();
}

elseif($_SERVER['REQUEST_METHOD'] =='GET')
{
	if(empty($_GET))
	{
		$stmt = $dbh->prepare("SELECT * FROM voiture");
	}
	else
	{	
		$stmt = $dbh->prepare("SELECT * FROM voiture WHERE id=". $_GET['id']);
	}
	$stmt->execute();
	//echo '<pre>'; var_dump($stmt->fetchAll()); echo '</pre>';
	echo json_encode($stmt->fetchAll());
}

?>