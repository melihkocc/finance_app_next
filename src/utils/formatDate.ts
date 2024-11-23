export const formatDateWithDay = (dateString: string): string => {
    const date = new Date(dateString); // Tarihi Date objesine dönüştür
    const day = String(date.getDate()).padStart(2, '0'); // Gün, iki haneli olmalı
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ay, iki haneli olmalı
    const year = date.getFullYear(); // Yıl

    // Gün ismini almak için
    const dayOfWeek = date.toLocaleDateString('tr-TR', { weekday: 'long' }); // 'long' formatı, tam gün ismi verir (Pazar, Pazartesi, vb.)

    return `${day}.${month}.${year} ${dayOfWeek}`; // "gg.mm.yyyy Gün" formatında döndür
}

export const formatDateForTransaction = (dateString: string): string => {
    const date = new Date(dateString); // Tarihi Date objesine dönüştür
    const day = String(date.getDate()).padStart(2, '0'); // Gün, iki haneli olmalı
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ay, iki haneli olmalı
    const year = date.getFullYear(); // Yıl
  
    // Gün ismini almak için (isteğe bağlı, formatınıza eklemek isterseniz)
    // const dayOfWeek = date.toLocaleDateString('tr-TR', { weekday: 'long' }); 
  
    return `${year}-${month}-${day}`; // "yyyy-mm-dd" formatında döndür
  }
  