declare interface Point {
    x: number;
    y: number;
    color: Color; // Optional color property
}

declare interface Color {
    r: number; // Red component (0-1)
    g: number; // Green component (0-1)
    b: number; // Blue component (0-1)
    a?: number; // Alpha component (0.5-1), optional
}

declare interface PointId extends Point {
    id: string; // Unique identifier for the point
}

declare interface PointColor extends PointId {
    color: string; // Color property is required
}

declare interface PointSize extends PointColor {
    size: number; // Size property for the point
}

declare interface PointShape extends PointSize {
    shape: 'circle' | 'square'; // Shape property for the point
}

declare interface PointLabel extends PointShape {
    label: string; // Label for the point
}

declare interface PointTimestamp extends PointLabel {
    timestamp: number; // Timestamp for when the point was created
}

declare interface PointMetadata extends PointTimestamp {
    metadata: Record<string, any>; // Additional metadata for the point
}

declare interface PointUser extends PointMetadata {
    user: string; // User who created the point
}

declare interface PointStatus extends PointUser {
    status: 'active' | 'inactive'; // Status of the point
}

declare interface PointPriority extends PointStatus {
    priority: 'low' | 'medium' | 'high'; // Priority of the point
}

declare interface PointTags extends PointPriority {
    tags: string[]; // Tags associated with the point
}

declare interface PointCustomData extends PointTags {
    customData: Record<string, any>; // Custom data for the point
}
