import fs from 'node:fs/promises';

const products = [
  {
    source_index: 59,
    sku: 'NW260791NEGMS1',
    upc: '246834131514',
    title: 'Máquina Boxeo Musical Bluetooth 6 Zonas Con 2 Pares Guantes',
    model: 'Estrella 6 zonas RGB',
    design: 'panel angular de seis zonas con iluminación roja y azul',
    light: 'iluminación de dos colores y respuesta luminosa al golpe',
    gloves: 'dos pares de guantes, uno para adulto y otro infantil',
    price: 53990,
    weight_g: 1460,
    image_path: '.data/batch-51-129-images/NW260791NEGMS1-1.png'
  },
  {
    source_index: 60,
    sku: 'NW260792NEGMS1',
    upc: '246834131521',
    title: 'Máquina Boxeo Musical Bluetooth 6 Zonas Con 2 Pares Guantes',
    model: 'Circular 6 zonas RGB',
    design: 'panel circular de seis zonas con aros luminosos azules',
    light: 'aros LED alrededor de cada zona y secuencias visuales de entrenamiento',
    gloves: 'dos pares de guantes, uno para adulto y otro infantil',
    price: 64990,
    weight_g: 1570,
    image_path: '.data/batch-51-129-images/NW260792NEGMS1-1.png'
  }
];

function makeDescription(p) {
  return `¡Bienvenido a Furaxis!

Convertir una pared libre en un punto de movimiento, coordinación y entretenimiento es más sencillo con esta máquina de boxeo musical. El modelo combina seis zonas de golpe, iluminación dinámica, conexión Bluetooth, sonidos de respuesta, conteo y diferentes ritmos de práctica. La variante corresponde a un ${p.design} e incluye ${p.gloves}, lo que permite adaptar la experiencia para compartir en familia bajo supervisión responsable.

La propuesta es seguir las señales luminosas y responder con golpes controlados sobre las zonas acolchadas. La música aporta ritmo, mientras el conteo ayuda a registrar la secuencia. Puedes ajustar la velocidad de acuerdo con tu experiencia y elegir entre diferentes modos disponibles en el equipo. No es un aparato profesional de medición deportiva: está pensado para actividad recreativa, coordinación y ejercicio en casa.

CARACTERÍSTICAS PRINCIPALES

- Máquina de boxeo musical para instalación en pared.
- Seis zonas de golpe claramente definidas.
- ${p.light.charAt(0).toUpperCase() + p.light.slice(1)}.
- Conectividad Bluetooth para reproducir audio compatible.
- Respuesta sonora y visual durante la práctica.
- Contador digital visible en el centro.
- Velocidad de golpe ajustable.
- Varios modos de funcionamiento.
- Dos alternativas de instalación según la superficie y accesorios recibidos.
- Incluye dos pares de guantes: tamaño adulto e infantil.
- Color negro de apariencia moderna.
- Producto nuevo.

ENTRENAMIENTO ENTRETENIDO EN CASA

Seguir una secuencia de luces obliga a observar, reaccionar y coordinar los movimientos. En sesiones cortas puede acompañar una rutina activa, una pausa de movimiento o un juego por turnos. El usuario puede comenzar lentamente para aprender la posición de las zonas y aumentar el ritmo cuando se sienta cómodo. La prioridad debe ser la técnica controlada, no la fuerza máxima.

La música puede ayudar a mantener un ritmo constante. Vincula un teléfono compatible por Bluetooth y selecciona una pista apropiada, o utiliza los sonidos integrados según el modo disponible. La estabilidad de la conexión depende del teléfono, la distancia, las interferencias y la versión Bluetooth. Las aplicaciones y servicios de música no forman parte de la compra.

SEIS ZONAS Y SEÑALES LUMINOSAS

El panel presenta seis superficies de impacto distribuidas alrededor del centro. Las luces indican el objetivo y permiten crear secuencias variables. Golpea únicamente las áreas destinadas a recibir impactos; evita el display, los parlantes, los bordes y los controles. Las señales pueden cambiar según el modo y la velocidad seleccionada.

Para una primera sesión, utiliza el nivel más lento. Adopta una postura estable, mantén las muñecas alineadas y responde con movimientos breves. Cuando logres seguir la secuencia con comodidad, aumenta gradualmente la velocidad. No es necesario golpear con máxima potencia para activar el equipo.

DOS PARES DE GUANTES INCLUIDOS

La presentación incorpora un par de guantes para adulto y un par infantil. Esto facilita compartir la actividad entre integrantes de la familia, siempre respetando el tamaño, la comodidad y la supervisión correspondiente. Los guantes brindan una capa de protección básica, pero no sustituyen equipamiento técnico de boxeo ni la instrucción profesional.

Antes de cada uso, revisa costuras, cierres y ajuste. Las manos deben entrar cómodamente, sin presión excesiva ni movimiento suelto. Si el guante no se ajusta bien, suspende la actividad. No compartas guantes húmedos; déjalos ventilar después de la sesión y límpialos de acuerdo con su material.

CONEXIÓN BLUETOOTH Y MÚSICA

Activa el equipo y coloca el teléfono a una distancia cercana. Busca el dispositivo desde el menú Bluetooth y completa la vinculación. El nombre mostrado puede variar. Si no aparece, apaga y enciende la conexión, verifica que otro teléfono no esté enlazado y consulta las indicaciones incluidas con el producto.

Utiliza un volumen moderado que permita escuchar el entorno. La función Bluetooth se destina a la reproducción de audio compatible; no implica acceso a internet, almacenamiento de canciones ni suscripción musical. El teléfono, cargador y servicios externos no están incluidos.

MODOS, VELOCIDAD Y CONTEO

Los modos permiten variar la secuencia y la dinámica de las luces. La regulación de velocidad ayuda a adaptar el desafío a principiantes y usuarios con mayor coordinación. El contador central ofrece una referencia visual durante la actividad. Su lectura es recreativa y no debe considerarse una medición certificada de rendimiento, calorías, fuerza o condición física.

Organiza sesiones por tiempo en lugar de golpear hasta el agotamiento. Por ejemplo, realiza intervalos cortos, descansa y revisa la postura. Una persona adulta puede preparar juegos sencillos: alcanzar una cantidad de aciertos, alternar manos, responder solo a determinadas luces o turnarse con otra persona.

INSTALACIÓN EN LA PARED

El panel debe colocarse sobre una superficie firme, limpia, seca y adecuada para soportar impactos repetidos. La presentación ofrece dos modalidades de fijación según los accesorios recibidos. La elección depende del tipo de muro, su acabado y el uso previsto. Una fijación adhesiva puede no ser adecuada para superficies rugosas, húmedas, recién pintadas o con revestimientos delicados.

Antes de instalar, mide la altura del usuario y deja espacio libre alrededor. La zona central debería quedar en una posición cómoda para golpear sin elevar excesivamente los hombros. No instales sobre vidrio, puertas livianas, tabiques inestables ni cerca de objetos frágiles. Si la pared requiere perforación o anclajes, utiliza elementos compatibles y solicita ayuda profesional cuando sea necesario.

Después de instalar, aplica presión suave con las manos para comprobar estabilidad. No comiences a golpear hasta confirmar que el panel no se mueve. Revisa periódicamente la fijación, especialmente después de sesiones intensas. Detén el uso si notas separación, vibración excesiva o daños en el muro.

CARGA Y ALIMENTACIÓN

Utiliza el cable y el método de carga indicados con el equipo. Carga en un lugar ventilado, sobre una superficie no inflamable y lejos de humedad. No cubras el dispositivo durante la carga. Evita cargadores dañados, conexiones flojas y adaptadores que no cumplan las especificaciones requeridas.

No golpees el panel mientras está conectado para cargar, salvo que las instrucciones del fabricante lo autoricen expresamente. Desconecta tomando el conector y no tirando del cable. Si notas olor, deformación, calentamiento anormal o daño en la batería, interrumpe el uso y solicita revisión.

ESPECIFICACIONES DE LA VARIANTE

- Tipo: máquina de boxeo musical para pared.
- Diseño: ${p.design}.
- Cantidad de zonas: seis.
- Color principal: negro.
- Conectividad: Bluetooth.
- Iluminación: ${p.light}.
- Funciones: música, respuesta luminosa, sonido, conteo, ajuste de velocidad y modos seleccionables.
- Guantes: ${p.gloves}.
- Uso: recreativo y ejercicio doméstico controlado.
- Condición: nuevo.
- Garantía del vendedor: 30 días.

MEDIDAS DEL PAQUETE

El paquete preparado para despacho se registra en aproximadamente 45 x 40 x 6 cm y pesa cerca de ${p.weight_g} g. Se ajustó la medida logística para representar de forma coherente un panel de este formato, tomando como referencia la geometría del producto y modelos equivalentes. Las dimensiones del bulto no deben interpretarse como la medida exacta de cada zona de golpe.

El producto puede incluir protecciones y piezas acomodadas dentro de la caja. Abre con cuidado para no cortar el cable, los guantes ni los accesorios de fijación. Conserva el empaque hasta terminar la instalación y comprobar el funcionamiento.

RECOMENDACIONES DE USO

1. Revisa el panel, los guantes y los accesorios antes de instalar.
2. Elige una pared firme y define una altura cómoda.
3. Fija el equipo siguiendo el método apropiado para la superficie.
4. Carga la unidad conforme a sus instrucciones.
5. Coloca los guantes y comienza con velocidad baja.
6. Golpea solo las zonas destinadas a impacto.
7. Mantén sesiones cortas, con descansos e hidratación.
8. Apaga, limpia y revisa la fijación al terminar.

SEGURIDAD DURANTE LA ACTIVIDAD

Calienta hombros, codos y muñecas antes de comenzar. Mantén distancia suficiente para extender los brazos sin bloquear completamente los codos. No golpees de lado con la muñeca doblada. Suspende la actividad ante dolor, mareo, falta de aire inusual o cualquier molestia.

Los niños deben usar el equipo bajo supervisión directa de una persona adulta. Mantén despejada el área, sin muebles con bordes, ventanas, mascotas ni otras personas dentro del alcance de los brazos. No realices competencias de fuerza ni permitas golpes con objetos.

Este artículo no sustituye un saco profesional, un entrenador ni equipos médicos o de rehabilitación. Si el usuario tiene una condición de salud, lesión previa o limitación de movilidad, debe consultar a un profesional antes de iniciar una nueva actividad física.

CUIDADO Y LIMPIEZA

Apaga el equipo y desconéctalo antes de limpiar. Utiliza un paño suave apenas húmedo sobre la superficie y sécala inmediatamente. No sumerjas, no rocíes líquido sobre parlantes o controles y no uses solventes. Retira el polvo de bordes y zonas de ventilación sin introducir objetos.

Ventila los guantes después de usarlos. Limpia su exterior con un método adecuado al material y deja secar completamente a la sombra. No guardes el conjunto húmedo. Mantén el panel alejado de sol directo prolongado, calefactores y lugares con condensación.

PREGUNTAS FRECUENTES

¿Cuántas zonas de golpe tiene?
Este modelo incorpora seis zonas de impacto.

¿Incluye guantes?
Sí. Incluye dos pares: un par para adulto y otro infantil, de acuerdo con la presentación de esta variante.

¿Se conecta por Bluetooth?
Sí. Puede vincularse con un teléfono compatible para reproducir audio. La conexión puede variar según el equipo y el entorno.

¿Tiene luces y sonido?
Sí. Dispone de señales luminosas y respuesta sonora asociada a sus modos de práctica.

¿Se puede ajustar la velocidad?
Sí. Permite seleccionar niveles o ritmos para adaptar el desafío.

¿Cuenta los golpes?
El display ofrece una referencia de conteo durante el uso. No es un instrumento deportivo certificado.

¿Hay que perforar la pared?
Depende del método de instalación, la superficie y los accesorios recibidos. Elige una fijación segura y compatible con tu muro.

¿Es para entrenamiento profesional?
Está pensado para entretenimiento y actividad doméstica. No reemplaza equipamiento profesional ni instrucción técnica.

¿Los niños pueden usarlo?
Pueden participar cuando el tamaño de los guantes y la altura resulten adecuados, siempre con supervisión directa de un adulto y a baja intensidad.

¿Las medidas publicadas son del panel?
Son medidas aproximadas del paquete logístico. El tamaño del producto instalado puede diferir.

¿Tiene garantía?
Sí. Incluye garantía del vendedor por 30 días. Para ayuda posterior a la compra, utiliza la mensajería de la operación.

ANTES DE COMPRAR

Confirma el diseño visible, la cantidad de zonas, los guantes incluidos y el espacio disponible en tu pared. Revisa que la superficie sea apta para una fijación segura. Esta publicación corresponde al ${p.design}; los teléfonos y elementos de ambientación no forman parte de la compra.

En Furaxis queremos que la información te ayude a decidir. Esta máquina combina movimiento, música, luces y coordinación en una experiencia doméstica que puede disfrutarse en sesiones cortas y controladas.

Usted también puede buscar: máquina de boxeo musical, máquina de boxeo Bluetooth, boxeo electrónico para pared, tablero de boxeo con luces, punching musical, máquina de golpes con música, entrenamiento de reflejos, boxeo interactivo, saco de boxeo electrónico, kit boxeo con guantes, juego de boxeo familiar.`;
}

for (const p of products) {
  const spec = {
    source_index: p.source_index,
    sku: p.sku,
    category_id: 'MLC440452',
    title: p.title,
    brand: 'Genérica',
    model: p.model,
    upc: p.upc,
    image_path: p.image_path,
    price: p.price,
    price_source: '开发跟踪表平台售价 CL × 1.8，向上取 990 结尾',
    quantity: 10,
    package: { length_cm: 45, width_cm: 40, height_cm: 6, weight_g: p.weight_g },
    extra_attributes: [
      { id: 'COLOR', value_name: 'Negro' },
      { id: 'MATERIAL', value_name: 'Plástico y componentes electrónicos' },
      { id: 'IS_SUITABLE_FOR_SHIPMENT', value_id: '242085' }
    ],
    description: makeDescription(p)
  };
  await fs.writeFile(`.data/publish-spec-${p.source_index}.json`, `${JSON.stringify(spec, null, 2)}\n`);
  console.log(JSON.stringify({ index: p.source_index, title_length: p.title.length, description_length: spec.description.length }));
}
