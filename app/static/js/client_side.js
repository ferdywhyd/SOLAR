$(document).ready(function(){
  
  // -[Animasi Scroll]---------------------------
  
  $(".navbar a, footer a[href='#halamanku']").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function(){
        window.location.hash = hash;
      });
    } 
  });
  
  $(window).scroll(function() {
    $(".slideanim").each(function(){
      var pos = $(this).offset().top;
      var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
          $(this).addClass("slide");
        }
    });
  });

  
  // -[Prediksi Model]---------------------------
  
  // Fungsi untuk memanggil API ketika tombol prediksi ditekan
  $("#prediksi_submit").click(function(e) {
    e.preventDefault();
	
	// Set data pengukuran bunga iris dari input pengguna
    var input_Temperature = $("#range_Temperature").val(); 
	var input_Pressure  = $("#range_Pressure").val(); 
	var input_Humidity = $("#range_Humidity").val(); 
	var input_WindDirection  = $("#range_WindDirection").val();
  var input_Speed  = $("#range_Speed").val();

	// Panggil API dengan timeout 1 detik (1000 ms)
    setTimeout(function() {
	  try {
			$.ajax({
			  url  : "/api/deteksi",
			  type : "POST",
			  data : {"Temperature" : input_Temperature,
					  "Pressure"  : input_Pressure,
            "Humidity"  : input_Humidity,
					  "WindDirection" : input_WindDirection,
					  "Speed"  : input_Speed,
			         },
			  success:function(res){
				// Ambil hasil prediksi spesies dan path gambar spesies dari API
				res_data_prediksi   = res['prediksi']
//				res_gambar_prediksi = res['gambar_prediksi']
				
				// Tampilkan hasil prediksi ke halaman web
			    generate_prediksi(res_data_prediksi); 
			  }
			});
		}
		catch(e) {
			// Jika gagal memanggil API, tampilkan error di console
			console.log("Gagal !");
			console.log(e);
		} 
    }, 1000)
    
  })
    
  // Fungsi untuk menampilkan hasil prediksi model
  function generate_prediksi(data_prediksi) {
    var str="";
    str += "<h3>Hasil Prediksi Radiasi</h3>";
    str += "<br>";
//    str += "<img src='" + image_prediksi + "' width=\"200\" height=\"150\"></img>"
    str += "<h3>" + data_prediksi + " watts per meter 2" + "</h3>";
    $("#hasil_prediksi").html(str);
  }  
  
})
  
