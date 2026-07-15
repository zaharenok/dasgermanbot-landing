(function() {
  /* Google Tag Manager */
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-PXHHH8TK');

  /* Meta Pixel */
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '1445746883270633');
  fbq('track', 'PageView');

  /* Google Analytics (gtag.js) */
  var gas = document.createElement('script');
  gas.async = true; gas.src = 'https://www.googletagmanager.com/gtag/js?id=G-FES4KCTZ1T';
  document.head.appendChild(gas);
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-FES4KCTZ1T');

  /* Flowsery */
  var fls = document.createElement('script');
  fls.defer = true; fls.setAttribute('data-fl-website-id', 'flid_4RIHfEW_NNP0UCNbgJia_g');
  fls.src = 'https://cdn.flowsery.com/main.js'; document.head.appendChild(fls);

  /* Umami */
  var ums = document.createElement('script');
  ums.defer = true; ums.setAttribute('data-website-id', '1081934e-ebc1-48fd-a48b-4c74e0f68663');
  ums.src = 'https://cloud.umami.is/script.js'; document.head.appendChild(ums);

  /* Microsoft Clarity */
  (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "k8m4x2j3n7");

  /* Yandex Metrica */
  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
  (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

  ym(98765432, "init", {
      clickmap:true, trackLinks:true, accurateTrackBounce:true,
      webvisor:true, ecommerce:"dataLayer"
  });

})();
