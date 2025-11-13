import { conmysql } from "../db.js";



export const getProductos = async (req, res) => {
    try {
        const [result] = await conmysql.query("SELECT * FROM productos");
        res.json(result);
    } catch (error) {
        return res.status(500).json({
            message: "Error al consultar productos",
        });
    }
};


// =====================================
// Obtener un producto por ID
// =====================================
export const getproductosxid = async (req, res) => {
    try {
        const [result] = await conmysql.query(
            "SELECT * FROM productos WHERE prod_id = ?",
            [req.params.id]
        );

        if (result.length === 0)
            return res.status(404).json({
                prod_id: 0,
                message: "Producto no encontrado",
            });

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};


// =====================================
// Registrar producto
// =====================================
export const postProducto = async (req, res) => {
    try {
        const { prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, cat_id } = req.body;
        const prod_imagen = req.file ? `/uploads/${req.file.filename}` : null;

        const [row] = await conmysql.query(
            `INSERT INTO productos 
            (prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen, cat_id)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen, cat_id]
        );

        res.json({
            id: row.insertId,
            message: "Producto registrado",
        });
    } catch (error) {
        return res.status(500).json({ message: "Error del servidor" });
    }
};


// =====================================
// Actualizar producto completamente (PUT)
// =====================================
export const putProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo } = req.body;

        let prod_imagen = req.file
            ? `/uploads/${req.file.filename}`
            : null;

        // Si no se envió nueva imagen, conservar la existente
        if (!req.file) {
            const [rows] = await conmysql.query(
                "SELECT prod_imagen FROM productos WHERE prod_id = ?",
                [id]
            );

            if (rows.length === 0) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }

            prod_imagen = rows[0].prod_imagen;
        }

        const [result] = await conmysql.query(
            `UPDATE productos SET 
                prod_codigo = ?, 
                prod_nombre = ?, 
                prod_stock = ?, 
                prod_precio = ?, 
                prod_activo = ?, 
                prod_imagen = ? 
            WHERE prod_id = ?`,
            [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        const [rows] = await conmysql.query(
            "SELECT * FROM productos WHERE prod_id = ?",
            [id]
        );

        res.json(rows[0]);
    } catch (error) {
        console.error("Error en putProducto:", error);
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};


// =====================================
// Actualización parcial (PATCH)
// =====================================
export const patchProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo } = req.body;

        const prod_imagen = req.file
            ? `/uploads/${req.file.filename}`
            : null;

        const [result] = await conmysql.query(
            `UPDATE productos SET 
                prod_codigo = IFNULL(?, prod_codigo),
                prod_nombre = IFNULL(?, prod_nombre),
                prod_stock = IFNULL(?, prod_stock),
                prod_precio = IFNULL(?, prod_precio),
                prod_activo = IFNULL(?, prod_activo),
                prod_imagen = IFNULL(?, prod_imagen)
            WHERE prod_id = ?`,
            [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        const [rows] = await conmysql.query(
            "SELECT * FROM productos WHERE prod_id = ?",
            [id]
        );

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};


// =====================================
// Eliminar producto
// =====================================
export const deleteProducto = async (req, res) => {
    try {
        const [rows] = await conmysql.query(
            "DELETE FROM productos WHERE prod_id = ?",
            [req.params.id]
        );

        if (rows.affectedRows === 0)
            return res.status(404).json({
                id: 0,
                message: "No se pudo eliminar el producto",
            });

        res.sendStatus(202);
    } catch (error) {
        return res.status(500).json({
            message: "Error del servidor",
        });
    }
};
