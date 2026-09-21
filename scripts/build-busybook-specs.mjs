import fs from 'node:fs/promises';
import path from 'node:path';

const products = [
  {
    source_index: 54,
    sku: 'NW260787VERMS1',
    upc: '246834131460',
    title: 'Libro Sensorial Montessori De Fieltro Granja',
    model: 'Busy Farm Verde',
    color: 'Verde',
    theme: 'Granja',
    presentation: 'formato libro con temática de granja y portada verde',
    activities: 'escenas y figuras inspiradas en la granja, pensadas para observar, manipular, asociar y crear pequeñas historias',
    image_path: '.data/batch-51-129-images/NW260787VERMS1-1.png',
    price: 27990,
    package: { length_cm: 21, width_cm: 21, height_cm: 7, weight_g: 300 }
  },
  {
    source_index: 55,
    sku: 'NW260788ROSMS1',
    upc: '246834131477',
    title: 'Libro Sensorial Montessori Mochila Princesa',
    model: 'Busy Book Princesa Rosado',
    color: 'Rosa',
    theme: 'Princesa',
    presentation: 'formato tipo mochila en color rosado con temática de princesa',
    activities: 'elementos visuales y piezas manipulables de inspiración fantástica para observar, relacionar y crear historias',
    image_path: '.data/batch-51-129-images/NW260788ROSMS1-1.png',
    price: 25990,
    package: { length_cm: 30, width_cm: 25, height_cm: 5, weight_g: 450 }
  },
  {
    source_index: 56,
    sku: 'NW260789AZUMS1',
    upc: '246834131484',
    title: 'Libro Sensorial Montessori Mochila Dinosaurio',
    model: 'Busy Book Dinosaurio Azul',
    color: 'Azul',
    theme: 'Dinosaurios',
    presentation: 'formato tipo mochila en tonos azul y amarillo con temática de dinosaurios',
    activities: 'figuras y escenas inspiradas en dinosaurios para observar, manipular, relacionar y crear historias',
    image_path: '.data/batch-51-129-images/NW260789AZUMS1-1.png',
    price: 25990,
    package: { length_cm: 30, width_cm: 25, height_cm: 5, weight_g: 450 }
  },
  {
    source_index: 57,
    sku: 'NW260790ROSMS1',
    upc: '246834131491',
    title: 'Libro Sensorial Montessori De Fieltro Granja',
    model: 'My First Farm Book Rosado',
    color: 'Rosa',
    theme: 'Granja',
    presentation: 'formato libro en color rosado con temática de granja',
    activities: 'escenas de granja y piezas manipulables para observar, asociar, reconocer y crear pequeñas historias',
    image_path: '.data/batch-51-129-images/NW260790ROSMS1-1.png',
    price: 27990,
    package: { length_cm: 20, width_cm: 24, height_cm: 8, weight_g: 330 }
  }
];

function description(p) {
  return `¡Bienvenido a Furaxis!

Aprender jugando puede transformar un momento cotidiano en una experiencia de descubrimiento. Este libro sensorial infantil se presenta en ${p.presentation}. Sus páginas y elementos manipulables invitan a explorar con las manos, mirar con atención y compartir actividades con una persona adulta. Es una alternativa entretenida para acompañar momentos tranquilos en casa, viajes, visitas o espacios de aprendizaje.

El diseño combina el aspecto cálido del fieltro y la tela con actividades que favorecen la participación activa. En lugar de limitarse a observar una pantalla, el niño puede tocar, mover, relacionar y volver a intentar. La temática ayuda a despertar la curiosidad y ofrece oportunidades para conversar, nombrar colores, reconocer figuras y crear historias sencillas. Cada uso puede adaptarse al ritmo y a la etapa de quien juega.

POR QUÉ PUEDE CONVERTIRSE EN UN FAVORITO

- Libro sensorial y didáctico con piezas y actividades manipulables.
- Diseño ${p.color.toLowerCase()} con temática de ${p.theme.toLowerCase()}.
- Fabricado principalmente en fieltro y tela, según el formato visible.
- Favorece actividades de coordinación, exploración sensorial y motricidad fina.
- Permite jugar acompañado y crear nuevas conversaciones en cada página.
- Formato práctico para guardar y transportar.
- No necesita pilas, conexión a internet, luces ni sonidos electrónicos.
- Producto nuevo, preparado para despacho.

La propuesta del libro es sencilla: aprender a través de acciones pequeñas y repetibles. Abrir, cerrar, unir, separar, reconocer, ordenar o comparar son gestos que pueden ayudar a practicar la coordinación entre la vista y las manos. La repetición permite que el niño gane confianza y encuentre nuevas maneras de resolver cada actividad. Una persona adulta puede acompañar el proceso con preguntas breves, palabras nuevas o pequeñas historias relacionadas con el tema.

EXPLORACIÓN SENSORIAL Y JUEGO ACTIVO

El fieltro ofrece una textura diferente a la de un libro de papel. Al tocar las páginas y manipular sus elementos, el niño recibe información por medio de la vista y el tacto. Esta combinación puede enriquecer el juego y mantener la atención durante actividades cortas. No se busca una única respuesta correcta para todo: algunas páginas pueden utilizarse para reconocer formas, otras para contar, clasificar, imaginar o simplemente observar detalles.

Las actividades se relacionan con ${p.activities}. Esto permite que el libro acompañe distintos momentos. En una primera experiencia, la persona adulta puede mostrar cada página y explicar cómo se utiliza. Más adelante, el niño puede recordar los movimientos y probar de manera progresivamente independiente, siempre con supervisión adecuada.

APOYO A LA MOTRICIDAD FINA

La motricidad fina participa en acciones cotidianas como tomar objetos pequeños, abrochar una prenda, sujetar un lápiz o pasar una página. Las actividades manipulables ofrecen una forma lúdica de practicar movimientos de manos y dedos. El objetivo no es exigir rapidez, sino permitir intentos tranquilos, celebrar los avances y adaptar la dificultad a la edad y habilidad del niño.

Para comenzar, elige una sola página y muestra el movimiento lentamente. Da tiempo para observar y repetir. Si una actividad resulta difícil, puedes sostener el libro o guiar suavemente la mano sin forzar las piezas. Volver a una actividad conocida antes de presentar otra nueva ayuda a crear una experiencia positiva. El acompañamiento y la conversación son tan importantes como el material.

APRENDIZAJE MEDIANTE EL LENGUAJE

El libro también puede utilizarse como punto de partida para ampliar vocabulario. Nombra los colores, las formas, los personajes y las acciones que aparecen. Formula preguntas sencillas: ¿qué ves?, ¿dónde está?, ¿qué color tiene?, ¿qué podría pasar después? No es necesario seguir siempre el mismo orden. Inventar una historia distinta convierte cada sesión en una experiencia renovada.

En grupos pequeños, el libro puede apoyar turnos y colaboración. Una persona puede elegir una pieza y otra contar qué observa. En familia, puede formar parte de una rutina tranquila antes de dormir o de una actividad sin pantallas durante el día. El valor del juego aumenta cuando el adulto escucha, responde y deja espacio para que el niño proponga sus propias ideas.

TEMA Y PRESENTACIÓN

La variante de esta publicación corresponde a ${p.presentation}. Revisa la fotografía principal antes de comprar para confirmar que es el diseño que deseas. Los colores pueden percibirse de manera ligeramente diferente según la iluminación y la configuración de cada pantalla. Esta publicación corresponde al libro mostrado; los objetos utilizados únicamente para ambientación no forman parte de la compra.

El tema de ${p.theme.toLowerCase()} permite crear historias y asociaciones fáciles de reconocer. Puedes usar nombres, sonidos, colores o situaciones imaginarias según lo que aparezca en cada página. Evitamos prometer una cantidad exacta de actividades o piezas que no esté confirmada en la información de origen; la imagen vigente es la referencia visual para reconocer la variante y sus componentes.

FORMATO PRÁCTICO PARA DIFERENTES MOMENTOS

Por su formato, puede guardarse junto a otros juguetes didácticos o llevarse en una bolsa de paseo. Para viajes, prepara previamente una página conocida y otra nueva; así habrá una actividad familiar y un pequeño desafío. En una sala de espera o durante una visita, el libro puede ofrecer un momento de juego tranquilo que no depende de conexión, batería ni sonido.

Al transportarlo, verifica que todas las piezas estén correctamente sujetas y mantén el libro cerrado. No lo guardes húmedo ni debajo de objetos pesados. Si se utiliza fuera de casa, revisa al regresar que las piezas estén completas antes de almacenarlo. Estas pequeñas rutinas ayudan a conservarlo y también enseñan a ordenar después del juego.

ESPECIFICACIONES DE LA PUBLICACIÓN

- Tipo de producto: libro sensorial y didáctico infantil.
- Material principal de referencia: fieltro y tela.
- Tema: ${p.theme}.
- Color o combinación principal: ${p.color}.
- Funcionamiento electrónico: no requiere.
- Pilas: no utiliza.
- Luces: no incluye.
- Sonido electrónico: no incluye.
- Contenido: una unidad del libro sensorial mostrado en la publicación.
- Condición: nuevo.
- Garantía del vendedor: 30 días.

MEDIDAS DEL PAQUETE DE DESPACHO

El paquete preparado para envío mide aproximadamente ${p.package.length_cm} x ${p.package.width_cm} x ${p.package.height_cm} cm y pesa cerca de ${p.package.weight_g} g. Estas son medidas logísticas del bulto y no corresponden necesariamente a las dimensiones exactas del libro abierto ni de cada página. El material textil puede acomodarse dentro del empaque durante el transporte.

Al recibirlo, abre el paquete con cuidado y evita usar cuchillos o tijeras cerca del producto. Extiende el libro sobre una superficie limpia, revisa sus páginas y permite que el material recupere su forma. Si alguna pieza se encuentra doblada por el transporte, acomódala suavemente con las manos sin aplicar calor directo.

RECOMENDACIONES PARA EL PRIMER USO

1. Retira el producto del empaque y revisa todas las páginas.
2. Confirma que las piezas visibles estén bien sujetas antes de entregarlo al niño.
3. Presenta una actividad a la vez y explica el movimiento con calma.
4. Permite que el niño explore a su ritmo y ofrece ayuda cuando sea necesario.
5. Guarda todas las piezas en su lugar al terminar.
6. Realiza revisiones periódicas del estado del material y las uniones.

La supervisión adulta es importante, especialmente si el usuario todavía lleva objetos a la boca o si el diseño contiene piezas pequeñas o separables. La edad recomendada debe definirse considerando el desarrollo individual, la capacidad de seguir indicaciones y la revisión que haga la persona responsable. Este producto no reemplaza material terapéutico ni una evaluación profesional.

IDEAS PARA APROVECHARLO

Puedes convertir cada página en un pequeño desafío: buscar un color, nombrar una figura, contar elementos visibles, encontrar dos objetos relacionados o inventar un final para la escena. Otra posibilidad es pedir al niño que explique el movimiento después de aprenderlo. Enseñar a otra persona refuerza la memoria y transforma la actividad en un juego compartido.

Para variar la experiencia, combina el libro con canciones, cuentos o sonidos realizados por el adulto. Si el tema es ${p.theme.toLowerCase()}, inventa personajes y recorridos usando lo que aparece en las páginas. También puedes proponer turnos: primero el adulto realiza una acción y luego el niño intenta la siguiente. Mantén sesiones breves y termina mientras la experiencia siga siendo agradable.

En un espacio educativo, el libro puede utilizarse individualmente o con acompañamiento. En casa, puede integrarse a una caja de actividades sin pantalla. Para un regalo, resulta atractivo porque combina entretenimiento, color y oportunidades de aprendizaje. Antes de regalarlo, confirma que la variante y el tema coincidan con los intereses y la etapa del destinatario.

CUIDADO Y LIMPIEZA

Retira el polvo con un paño suave o un cepillo de cerdas delicadas. Para una marca localizada, utiliza un paño apenas húmedo y prueba primero en una zona poco visible. No sumerjas el libro, no uses blanqueador ni productos abrasivos y no lo pongas cerca de una fuente directa de calor. Si el material se humedece, déjalo secar completamente en un lugar ventilado antes de guardarlo.

No indicamos un ciclo específico de lavadora porque la etiqueta de cuidado del fabricante no está confirmada en los datos disponibles. Una limpieza suave y localizada ayuda a proteger colores, costuras, adhesivos y elementos de unión. Guarda el libro limpio, seco y cerrado, lejos de mascotas y de objetos que puedan enganchar o cortar la tela.

SEGURIDAD Y SUPERVISIÓN

Antes de cada uso, revisa costuras, cierres, cordones, broches y piezas manipulables. Si notas una parte suelta, rota o desgastada, suspende el uso hasta que una persona adulta determine que vuelve a ser seguro. No acerques el producto al fuego ni a superficies calientes. El material no debe utilizarse como mordedor, almohada, elemento de contención ni juguete para el agua.

Mantén el empaque fuera del alcance de los niños. La selección de la actividad y el nivel de ayuda deben adecuarse a cada etapa. Aunque el libro está pensado para el juego infantil, la presencia de un adulto permite acompañar el aprendizaje, conservar las piezas y responder ante cualquier dificultad.

PREGUNTAS FRECUENTES

¿Qué incluye la compra?
Incluye una unidad del libro sensorial correspondiente a la variante mostrada. Los objetos de ambientación no están incluidos.

¿Cuál es el tema de este modelo?
Esta variante tiene temática de ${p.theme.toLowerCase()} y color principal ${p.color.toLowerCase()}. Revisa la imagen para identificar su diseño.

¿Es un libro de papel?
No. Es un libro sensorial elaborado principalmente con materiales textiles como fieltro y tela.

¿Necesita pilas o conexión a internet?
No. Las actividades son manuales y no necesitan pilas, aplicaciones ni conexión.

¿Tiene luces o sonidos electrónicos?
No incluye luces ni sonido electrónico. La experiencia se basa en la manipulación y la exploración visual y táctil.

¿Ayuda a desarrollar habilidades?
Las actividades pueden acompañar la práctica de coordinación, motricidad fina, observación, asociación y lenguaje cuando se utilizan de forma adecuada y con acompañamiento. Los resultados dependen de la edad, el interés y la frecuencia de uso.

¿Para qué edad sirve?
La elección debe hacerse según el desarrollo del niño y siempre con supervisión adulta. Revisa las piezas antes de cada uso, especialmente si el niño lleva objetos a la boca.

¿Las medidas indicadas corresponden al libro?
No. Las medidas publicadas son las del paquete preparado para despacho. El tamaño del producto abierto puede ser diferente.

¿Se puede lavar en lavadora?
No recomendamos un ciclo de lavadora sin confirmar primero la etiqueta del fabricante. Prefiere una limpieza localizada y suave para cuidar las piezas y uniones.

¿Es una opción para regalo?
Sí, puede ser un regalo didáctico y entretenido para familias que buscan actividades manipulables y momentos sin pantalla. Confirma el tema y el color antes de comprar.

¿Tiene garantía?
Sí. La publicación incluye garantía del vendedor por 30 días. Si necesitas ayuda con una compra, utiliza la mensajería asociada a tu pedido.

ANTES DE FINALIZAR TU COMPRA

Revisa la fotografía, el tema, el color y el contenido señalado. La publicación corresponde a una unidad de la variante indicada. Las medidas informadas son logísticas y los colores pueden variar ligeramente por la pantalla. Si buscas una actividad electrónica, con música o iluminación, este modelo no corresponde a ese tipo de juguete; su valor está en la exploración manual, el acompañamiento y la imaginación.

En Furaxis queremos que elijas con información clara. Este libro sensorial reúne una presentación atractiva, actividades manipulables y posibilidades de juego compartido. Puede acompañar momentos de aprendizaje, viajes y rutinas tranquilas, ofreciendo una alternativa práctica para explorar, conversar y crear historias.

Usted también puede buscar: libro sensorial, libros sensoriales para bebés, libro didáctico infantil, juguetes didácticos, desarrollo de habilidades, motricidad fina, tablero sensorial Montessori, busy book, libro de fieltro, actividades Montessori, juguete educativo sin pantalla, libro sensorial de ${p.theme.toLowerCase()}.`;
}

for (const p of products) {
  const spec = {
    source_index: p.source_index,
    sku: p.sku,
    category_id: 'MLC418729',
    title: p.title,
    brand: 'Genérica',
    model: p.model,
    upc: p.upc,
    image_path: p.image_path,
    price: p.price,
    price_source: '开发跟踪表平台售价 CL × 1.8，向上取 990 结尾',
    quantity: 10,
    package: p.package,
    extra_attributes: [
      { id: 'AGE_GROUP', value_name: 'Niños' },
      { id: 'COLOR', value_name: p.color },
      { id: 'THEME', value_name: p.theme },
      { id: 'MATERIALS', value_name: 'Fieltro y tela' },
      { id: 'STIMULATED_SKILLS', value_name: 'Motriz, sensorial, coordinación y cognitiva' },
      { id: 'WITH_LIGHTS', value_id: '242084' },
      { id: 'WITH_SOUND', value_id: '242084' },
      { id: 'INCLUDES_CELL_BATTERIES', value_id: '242084' },
      { id: 'IS_SUITABLE_FOR_SHIPMENT', value_id: '242085' }
    ],
    description: description(p)
  };
  const out = path.resolve('.data', `publish-spec-${p.source_index}.json`);
  await fs.writeFile(out, `${JSON.stringify(spec, null, 2)}\n`);
  console.log(`${out} ${spec.title.length} ${spec.description.length}`);
}
