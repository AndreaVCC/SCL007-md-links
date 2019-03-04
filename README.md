## # Markdown Links
 
### Descripción 
Modulo que recorre archivos con extensión .md en busca de links para luego mostrarlos listados en consola con opción de verificar el estado del links.

### Requisitos
Tener instalada la ultima versión de [Node.js](https://nodejs.org/es/)
### Instalación
Abrir la consola desde tu proyecto e instalar:
 ```
$npm install --save https://github.com/AndreaVCC/SCL007-md-links.git
```

### Modo de uso

Para ver el listado de links con su titulo y ruta ejecutar desde la consola:

```
node index.js README.md
```


Para ver el listado de links con su titulo, ruta y estado de validación:

```
node index.js README.md --validate
```

### Ejemplo
